import React from 'react'
import { Row } from 'antd'

import Card from '../Card'
import ServiceTMDB from '../../services/serviceTMDB'
import './App.css'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      cards: [],
      loading: true,
    }

    const TMDB = new ServiceTMDB()
    TMDB.getMovies('return').then((res) => {
      this.setState({
        cards: res.map((elem) => <Card key={elem.id}>{elem}</Card>),
        loading: false,
      })
    })
  }

  render() {
    return (
      <div className="App">
        <Row gutter={[0, 38]} justify="center">
          {this.state.cards}
        </Row>
      </div>
    )
  }
}
