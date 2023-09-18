import React from 'react'
import { Tabs, Alert } from 'antd'

import NetworkStatus from '../NetworkStatus'
import SearchPage from '../SearchPage'
import RatedPage from '../RatedPage'
import { getGenres, addRating, getRatedMovies, createGuestSession } from '../../services/serviceTMDB'
import { ProviderTMDB } from '../TMDBContext'

import './App.css'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      guest_id: null,
      genres: null,
      rated_films: {},
      error: false,
      loading: true,
    }
  }

  async componentDidMount() {
    try {
      let result = await createGuestSession()
      this.setState({
        guest_id: result.guest_session_id,
        error: false,
        loading: false,
      })
    } catch {
      this.setState({
        error: true,
      })
    }

    try {
      let result = await getGenres()
      this.setState({
        genres: result,
        error: false,
        loading: false,
      })
    } catch {
      this.setState({
        error: true,
      })
    }
  }

  addRatingToFilm = async (filmId, value) => {
    try {
      await addRating(filmId, this.state.guest_id, value)
      const ratedFilms = { ...this.state.rated_films }
      ratedFilms[filmId] = value

      this.setState(
        {
          rated_films: ratedFilms,
          error: false,
        },
        () => {
          console.log(this.state.rated_films)
        }
      )
    } catch {
      this.setState({
        error: true,
      })
    }
  }

  getRatedFilms = async (page) => {
    try {
      let res = await getRatedMovies(this.state.guest_id, page)
      this.setState({
        error: true,
      })
      return res
    } catch {
      this.setState({
        error: true,
      })
    }
  }

  render() {
    if (this.state.error) {
      return <Alert>Что-то пошло не так. Обновите страницу, включите VPN</Alert>
    }
    if (!this.state.loading) {
      return (
        <div className="App">
          <ProviderTMDB
            value={{
              genres: this.state.genres,
              addRating: this.addRatingToFilm,
              ratedFilms: this.state.rated_films,
              super: 'super',
            }}
          >
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: '1',
                  label: 'Search',
                  children: <SearchPage />,
                },
                {
                  key: '2',
                  label: 'Rated',
                  children: this.state.guest_id ? <RatedPage guest_id={this.state.guest_id} /> : null,
                },
              ]}
              centered
              size="middle"
              destroyInactiveTabPane
              className="tabs"
              tabBarExtraContent
            />
            {<NetworkStatus />}
          </ProviderTMDB>
        </div>
      )
    }
  }
}
