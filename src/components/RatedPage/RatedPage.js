import React from 'react'
import { Spin, Alert, Space, Pagination } from 'antd'

import Card from '../Card'
import ServiceTMDB from '../../services/serviceTMDB'

import './RatedPage.css'

export default class RatedPage extends React.Component {
  constructor() {
    super()
    this.state = {
      cards: [],
      loading: true,
      error: false,
      currentPage: 1,
      totalFilms: 1,
    }
  }
  TMDB = new ServiceTMDB()
  componentDidMount() {
    this.getRatedFilms(1)
  }

  getRatedFilms = (page) => {
    this.TMDB.getRatedMovies(this.props.guest_id, page).then((res) => {
      this.setState({
        cards: res.cards.map((elem) => (
          <Card key={elem.id} filmId={elem.id}>
            {elem}
          </Card>
        )),
        loading: false,
        totalFilms: res.totalResults,
        currentPage: page,
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

  onChangePagination = (page) => {
    this.setState(
      {
        currentPage: page,
        loading: true,
      },
      () => {
        this.getRatedFilms(this.state.currentPage)
      }
    )
  }
  render() {
    return (
      <div className="RatedPage">
        {this.state.error ? this.renderError(this.state.error) : null}

        <div className="mainPage">
          {this.state.loading ? <Spin /> : this.state.cards}
          {this.state.cards.length === 0 && !this.state.loading ? (
            <Alert message="Вы еще не оценили фильмы :)" type="warning" />
          ) : null}
        </div>

        <Pagination
          defaultCurrent={this.state.currentPage}
          onChange={this.onChangePagination}
          total={this.state.totalFilms}
          className="paginationBlock"
          pageSize="20"
        />
      </div>
    )
  }
}
