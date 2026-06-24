/**
 * SceneErrorBoundary — catches fatal 3D errors so the DOM overlay
 * continues to render. Displays the error message in the canvas area.
 */

import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class SceneErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: unknown): void {
    console.error('3D scene crashed:', error.message, info)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex h-full items-center justify-center bg-void/80">
          <div className="text-center px-4">
            <p className="font-mono text-xs text-text-secondary/60 uppercase tracking-wider">
              Scene unavailable
            </p>
            <p className="mt-2 font-mono text-[11px] text-text-secondary/40">
              {this.state.error?.message}
            </p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
