import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-surface-1 px-6 text-center">
          <div className="rounded-[24px] border border-border bg-gradient-to-b from-white/[0.07] to-white/[0.045] p-8 shadow-soft backdrop-blur-[20px]">
            <p className="text-[15px] font-bold text-ink">Something went wrong</p>
            <p className="mt-2 text-[13px] text-ink-3">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <button
              onClick={this.handleRetry}
              className="mt-6 rounded-[18px] bg-gradient-to-br from-blue1 to-blue2 px-6 py-3 text-[15px] font-bold text-[#0b0d13] shadow-primary transition hover:brightness-105 active:scale-[0.97]"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
