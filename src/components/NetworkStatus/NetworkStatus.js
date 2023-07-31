import React from 'react'
import { Alert } from 'antd'

class NetworkStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOnline: true,
    }
  }

  componentDidMount() {
    window.addEventListener('online', this.handleOnline)
    window.addEventListener('offline', this.handleOffline)
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline)
    window.removeEventListener('offline', this.handleOffline)
  }

  handleOnline = () => {
    this.setState({ isOnline: true })
  }

  handleOffline = () => {
    this.setState({ isOnline: false })
  }

  render() {
    const { isOnline } = this.state

    return (
      <div>
        {isOnline ? null : <Alert message="Error" description="Нет подключения к сети" type="error" showIcon />}
      </div>
    )
  }
}

export default NetworkStatus
