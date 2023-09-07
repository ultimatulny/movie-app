import React from 'react'
import { Spin, Alert, Space, Input, Pagination } from 'antd'
import { debounce } from 'lodash'

import Card from '../Card'
import ServiceTMDB from '../../services/serviceTMDB'

import './SearchPage.css'

export default class SearchPage extends React.Component {
  constructor() {
    super()
    this.state = {
      cards: [],
      loading: true,
      error: false,
      searchValue: 'return',
      currentPage: 1,
      totalFilms: 1,
    }
  }
  TMDB = new ServiceTMDB()
  componentDidMount() {
    this.searchFilms(this.state.searchValue, this.state.currentPage)
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

  searchFilms = debounce((filmName, page) => {
    this.TMDB.getMovies(filmName, page)
      .then((res) => {
        this.setState({
          cards: res.cards.map((elem) => (
            <Card key={elem.id} filmId={elem.id}>
              {elem}
            </Card>
          )),
          loading: false,
          totalFilms: res.totalResults,
          currentPage: 1,
        })
      })
      .catch((err) => {
        this.setState({
          error: err,
        })
      })
  }, 1000)

  changeSearch = (e) => {
    const searchFilmName = e.target.value.trim()
    this.setState({
      searchValue: searchFilmName,
      loading: true,
    })
    if (searchFilmName === '') {
      this.searchFilms('return', this.state.currentPage)
    } else {
      this.searchFilms(searchFilmName, this.state.currentPage)
    }
  }

  onChangePagination = (page) => {
    this.setState(
      {
        currentPage: page,
        loading: true,
      },
      () => {
        this.searchFilms(this.state.searchValue, this.state.currentPage)
      }
    )
  }
  render() {
    return (
      <div className="SearchPage">
        {this.state.error ? this.renderError(this.state.error) : null}
        <div className="mainPage">
          <Input
            placeholder="Type to search..."
            className="searchInput"
            value={this.state.searchValue}
            onChange={this.changeSearch}
          />
          {this.state.loading ? <Spin /> : this.state.cards}
          {this.state.cards.length === 0 && !this.state.loading ? (
            <Alert message="По вашему запросу ничего не найдено" type="warning" />
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
