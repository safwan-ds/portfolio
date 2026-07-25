export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

let _counter = 0

export function createMessage(role: 'user' | 'assistant', content: string): ChatMessage {
  return { id: `m_${++_counter}`, role, content, timestamp: Date.now() }
}

const MODEL = 'deepseek-v4-flash'

/** Rough token estimate: ~4 chars per token for mixed text. */
function estimateTokens(text: string): number {
  let t = 0
  for (const ch of text) {
    t += ch.charCodeAt(0) > 127 ? 2 : 1
  }
  return Math.ceil(t / 4)
}

/** Max tokens for conversation history (system prompt handled separately). */
const MAX_HISTORY_TOKENS = 3000

export function prepareMessages(
  messages: ChatMessage[],
  systemPrompt: string,
): { role: string; content: string }[] {
  const system: { role: string; content: string } = { role: 'system', content: systemPrompt }
  const sysTokens = estimateTokens(systemPrompt)

  // Build candidates newest-first, stop when adding another would exceed budget
  const candidates: { role: string; content: string; tokens: number }[] = []
  let total = sysTokens

  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i]
    const t = estimateTokens(m.content)
    if (total + t > MAX_HISTORY_TOKENS) break
    candidates.push({
      role: m.role === 'assistant' ? ('assistant' as const) : ('user' as const),
      content: m.content,
      tokens: t,
    })
    total += t
  }

  // Reverse back to chronological order (oldest first)
  const history = candidates.reverse().map(({ role, content }) => ({ role, content }))

  return [system, ...history]
}

export async function sendMessage(
  messages: ChatMessage[],
  systemPrompt: string,
  workerUrl: string,
  onChunk: (chunk: string) => void,
): Promise<string> {
  const apiMessages = prepareMessages(messages, systemPrompt)

  const res = await fetch(workerUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: apiMessages, model: MODEL }),
  })

  if (!res.ok) {
    const text = await res.text()
    let detail = text
    try {
      const parsed = JSON.parse(text)
      detail = parsed.error || text
    } catch {}
    throw new Error(`API error (${res.status}): ${detail}`)
  }

  const reader = res.body?.getReader()
  if (!reader) throw new Error('No response body')

  const decoder = new TextDecoder()
  const contentParts: string[] = []
  let buffer = ''

  while (true) {
    let chunk
    try {
      chunk = await reader.read()
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : 'Connection lost'
      if (contentParts.length > 0) {
        console.warn('Stream interrupted, returning partial:', errMsg)
        break
      }
      throw new Error(`Stream error: ${errMsg}`)
    }
    const { done, value } = chunk
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const events = buffer.split('\n\n')
    buffer = events.pop() || ''

    for (const event of events) {
      let shouldStop = false
      for (const line of event.split('\n')) {
        if (!line.startsWith('data: ')) continue
        const json = line.slice(6).trim()
        if (json === '[DONE]') {
          shouldStop = true
          break
        }
        try {
          const parsed = JSON.parse(json)
          const content = parsed?.choices?.[0]?.delta?.content
          if (content) {
            contentParts.push(content)
            onChunk(content)
          }
        } catch {}
      }
      if (shouldStop) break
    }
  }

  return contentParts.join('')
}
