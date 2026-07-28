import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiChatBubbleLeftRight, HiPaperAirplane } from 'react-icons/hi2'
import { HiX } from 'react-icons/hi'
import { type ChatMessage, createMessage, sendMessage } from './chatEngine'
import { buildSystemPrompt } from '../../data/knowledge'
import ReactMarkdown, { type Components } from 'react-markdown'
import { useTranslation } from 'react-i18next'
import { useDeviceTier } from '../../hooks/useDeviceTier'
import { useRtl } from '../../hooks/useRtl'
import ExternalLink from '../ui/ExternalLink'

const markdownComponents: Components = {
  p: ({ children }) => <span className="block last:mb-0">{children}</span>,
  code: ({ className, children }) => {
    if (!className) {
      return (
        <code className="px-1 py-0.5 rounded bg-void/50 text-neon-cyan text-xs">{children}</code>
      )
    }
    return (
      <pre className="p-3 rounded-xl bg-void/80 border border-slate/20 overflow-x-auto my-2 text-xs leading-relaxed">
        <code>{children}</code>
      </pre>
    )
  },
  a: ({ href, children }) => (
    <ExternalLink href={href as string} className="text-neon-blue hover:underline">
      {children}
    </ExternalLink>
  ),
  ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 my-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1 my-1">{children}</ol>,
  strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
  h1: ({ children }) => <h1 className="text-base font-bold text-white mt-2 mb-1">{children}</h1>,
  h2: ({ children }) => <h2 className="text-sm font-bold text-white mt-2 mb-1">{children}</h2>,
  h3: ({ children }) => (
    <h3 className="text-sm font-semibold text-white mt-1 mb-0.5">{children}</h3>
  ),
  hr: () => <hr className="border-slate/30 my-2" />,
}

const MessageBubble = memo(function MessageBubble({ msg }: { msg: ChatMessage }) {
  return (
    <div className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
      {msg.role === 'assistant' && (
        <div className="w-7 h-7 rounded-full bg-neon-blue/20 border border-neon-blue/30 flex items-center justify-center shrink-0 mt-1">
          <span className="text-[10px] font-bold text-neon-blue">AI</span>
        </div>
      )}
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed wrap-break-word ${
          msg.role === 'user'
            ? 'bg-neon-blue/10 border border-neon-blue/20 rounded-ee-sm text-text-primary'
            : 'bg-slate/10 border border-slate/20 rounded-es-sm text-text-primary'
        }`}
      >
        <ReactMarkdown components={markdownComponents}>{msg.content}</ReactMarkdown>
      </div>
    </div>
  )
})

export default function AIChat() {
  const { t } = useTranslation()
  const isRtl = useRtl()
  const { isReduced } = useDeviceTier()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [streamText, setStreamText] = useState<string | null>(null)
  const systemPrompt = useMemo(() => buildSystemPrompt(t), [t])

  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const accumulatedRef = useRef('')
  const messagesRef = useRef(messages)
  const workerUrl: string = import.meta.env.VITE_AI_CHAT_WORKER_URL || ''

  useEffect(() => {
    messagesRef.current = messages
  })

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, streamText, loading, open])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (!open) return
    function onClick(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const handleSend = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = createMessage('user', text)
    setMessages((p) => [...p, userMsg])
    setInput('')
    setLoading(true)
    setError(null)
    setStreamText('')
    accumulatedRef.current = ''

    let lastUpdate = 0

    try {
      const prev = messagesRef.current
      const allMessages = [...prev, userMsg]
      const response = await sendMessage(allMessages, systemPrompt, workerUrl, (chunk) => {
        accumulatedRef.current += chunk
        const now = Date.now()
        if (now - lastUpdate > 40) {
          lastUpdate = now
          setStreamText(accumulatedRef.current)
        }
      })
      setStreamText(null)
      accumulatedRef.current = ''
      if (response) {
        setMessages((p) => [...p, createMessage('assistant', response)])
      }
    } catch (e) {
      const partial = accumulatedRef.current
      accumulatedRef.current = ''
      setStreamText(null)
      if (partial) {
        setMessages((p) => [...p, createMessage('assistant', partial)])
      }
      setError(e instanceof Error ? e.message : t('ai_chat.error_generic'))
    } finally {
      setLoading(false)
    }
  }, [input, loading, systemPrompt, workerUrl, t])

  if (!workerUrl) return null

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function onResizeStart(e: React.MouseEvent) {
    e.preventDefault()
    const panel = panelRef.current
    if (!panel) return
    const { offsetWidth: w, offsetHeight: h } = panel
    const startX = e.clientX
    const startY = e.clientY
    panel.style.width = `${w}px`
    panel.style.height = `${h}px`
    panel.style.userSelect = 'none'

    function onMove(me: MouseEvent) {
      const p = panelRef.current
      if (!p) return
      const newW = Math.max(
        280,
        Math.min(
          window.innerWidth * 0.8,
          isRtl ? w + (me.clientX - startX) : w - (me.clientX - startX),
        ),
      )
      const newH = Math.max(380, Math.min(window.innerHeight - 120, h - (me.clientY - startY)))
      p.style.width = `${newW}px`
      p.style.height = `${newH}px`
    }
    function onUp() {
      const p = panelRef.current
      if (p) p.style.userSelect = ''
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  const panelVariants = isReduced
    ? undefined
    : {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.2, ease: 'easeOut' as const },
        },
        exit: { opacity: 0, scale: 0.9, y: 10, transition: { duration: 0.15 } },
      }

  return (
    <>
      <AnimatePresence>
        {open &&
          (isReduced ? (
            <div
              ref={panelRef}
              key="chat-panel"
              className="fixed bottom-5 right-5 z-50 pointer-events-auto flex flex-col w-90 max-w-[calc(100vw-40px)] h-120 rounded-2xl border border-slate/20 shadow-2xl overflow-hidden bg-carbon/90 backdrop-blur-2xl"
            >
              <PanelContent
                onResizeStart={onResizeStart}
                onClose={() => setOpen(false)}
                t={t}
                listRef={listRef}
                messages={messages}
                loading={loading}
                streamText={streamText}
                error={error}
                input={input}
                setInput={setInput}
                onKeyDown={onKeyDown}
                handleSend={handleSend}
                inputRef={inputRef}
              />
            </div>
          ) : (
            <motion.div
              ref={panelRef}
              key="chat-panel"
              variants={panelVariants!}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-5 right-5 z-50 pointer-events-auto flex flex-col w-90 max-w-[calc(100vw-40px)] h-120 rounded-2xl border border-slate/20 shadow-2xl overflow-hidden bg-carbon/90 backdrop-blur-2xl"
            >
              <PanelContent
                onResizeStart={onResizeStart}
                onClose={() => setOpen(false)}
                t={t}
                listRef={listRef}
                messages={messages}
                loading={loading}
                streamText={streamText}
                error={error}
                input={input}
                setInput={setInput}
                onKeyDown={onKeyDown}
                handleSend={handleSend}
                inputRef={inputRef}
              />
            </motion.div>
          ))}
      </AnimatePresence>

      {!open && (
        <button
          ref={buttonRef}
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 pointer-events-auto w-14 h-14 rounded-full bg-carbon/90 border border-neon-blue/40 backdrop-blur-xl flex items-center justify-center text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue/60 transition-all shadow-lg shadow-neon-blue/10 active:scale-95"
          aria-label="Toggle AI chat"
        >
          <HiChatBubbleLeftRight size={22} />
        </button>
      )}
    </>
  )
}

function PanelContent({
  onResizeStart,
  onClose,
  t,
  listRef,
  messages,
  loading,
  streamText,
  error,
  input,
  setInput,
  onKeyDown,
  handleSend,
  inputRef,
}: {
  onResizeStart: (e: React.MouseEvent) => void
  onClose: () => void
  t: (key: string) => string
  listRef: React.RefObject<HTMLDivElement | null>
  messages: ChatMessage[]
  loading: boolean
  streamText: string | null
  error: string | null
  input: string
  setInput: (val: string) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  handleSend: () => void
  inputRef: React.RefObject<HTMLTextAreaElement | null>
}) {
  return (
    <>
      <div
        onMouseDown={onResizeStart}
        className="absolute top-0 inset-s-0 z-10 w-8 h-8 flex items-start justify-start cursor-nwse-resize rtl:cursor-nesw-resize group select-none"
      >
        <svg
          className="text-slate-500/50 group-hover:text-neon-blue/70 transition-colors rtl:scale-x-[-1]"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path d="M3 15 L15 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7 15 L15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M11 15 L15 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-b border-slate/20 shrink-0">
        <span className="font-mono text-xs tracking-widest text-neon-blue uppercase">
          {t('ai_chat.title')}
        </span>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-9 h-9 rounded-md text-slate-400 hover:text-text-primary hover:bg-slate/20 transition-colors"
          aria-label="Close"
        >
          <HiX size={18} />
        </button>
      </div>

      <div
        ref={listRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth"
        style={{ overscrollBehavior: 'contain' }}
      >
        {messages.length === 0 && !loading && streamText === null && (
          <div className="flex items-start gap-2">
            <div className="w-7 h-7 rounded-full bg-neon-blue/20 border border-neon-blue/30 flex items-center justify-center shrink-0 mt-1">
              <span className="text-[10px] font-bold text-neon-blue">AI</span>
            </div>
            <div className="bg-slate/10 border border-slate/20 rounded-2xl rounded-es-sm px-3 py-2 text-sm text-text-primary leading-relaxed">
              {t('ai_chat.welcome')}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}

        {loading && streamText !== null && (
          <div className="flex items-start gap-2">
            <div className="w-7 h-7 rounded-full bg-neon-blue/20 border border-neon-blue/30 flex items-center justify-center shrink-0 mt-1">
              <span className="text-[10px] font-bold text-neon-blue">AI</span>
            </div>
            <div className="bg-slate/10 border border-slate/20 rounded-2xl rounded-es-sm px-3 py-2 text-sm wrap-break-word">
              {streamText ? (
                <ReactMarkdown components={markdownComponents}>{streamText}</ReactMarkdown>
              ) : (
                <span className="inline-flex gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </span>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-neon-pink/10 border border-neon-pink/30 px-3 py-2 text-xs text-neon-pink">
            {error}
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-slate/20 p-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={t('ai_chat.placeholder')}
            rows={1}
            disabled={loading}
            enterKeyHint="send"
            inputMode="text"
            className="flex-1 resize-none rounded-xl bg-void/60 border border-slate/30 px-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-neon-blue/50 transition-colors disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="flex items-center justify-center shrink-0 w-10 h-10 rounded-xl bg-neon-blue/10 border border-neon-blue/30 text-neon-blue hover:bg-neon-blue/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Send"
          >
            <HiPaperAirplane size={16} className="rtl:rotate-180" />
          </button>
        </div>
      </div>
    </>
  )
}
