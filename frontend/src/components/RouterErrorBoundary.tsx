import { Component, type ReactNode } from 'react'
import { Button, Result } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class RouterErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Router error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px' }}>
          <Result
            status="error"
            title="Application Error"
            subTitle="An unexpected error occurred. Please reload the page to continue."
            extra={
              <Button type="primary" icon={<ReloadOutlined />} onClick={this.handleReload}>
                Reload Page
              </Button>
            }
          />
        </div>
      )
    }

    return this.props.children
  }
}
