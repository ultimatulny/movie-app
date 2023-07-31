import React from 'react'
import { Row, Spin, Alert, Space } from 'antd'

import Card from '../Card'
import ServiceTMDB from '../../services/serviceTMDB'
import NetworkStatus from '../NetworkStatus'

import './App.css'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      cards: [],
      loading: true,
      error: false,
    }

    const TMDB = new ServiceTMDB()
    TMDB.getMovies('return')
      .then((res) => {
        this.setState({
          cards: res.map((elem) => <Card key={elem.id}>{elem}</Card>),
          loading: false,
        })
      })
      .catch((err) => {
        this.setState({
          error: err,
        })
      })
  }

  renderError(errorText) {
    return (
      <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
      >
        <Alert message="Error" description={errorText} type="error" showIcon />
      </Space>
    )
  }

  render() {
    return (
      <div className="App">
        {<NetworkStatus />}
        {this.state.error ? this.renderError(this.state.error) : null}
        <Row gutter={[0, 38]} justify="center">
          {this.state.loading ? <Spin /> : this.state.cards}
        </Row>
      </div>
    )
  }
}
