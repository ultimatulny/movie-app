import React from 'react'
import { Tabs } from 'antd'

import NetworkStatus from '../NetworkStatus'
import SearchPage from '../SearchPage'
import RatedPage from '../RatedPage'
import ServiceTMDB from '../../services/serviceTMDB'
import { ProviderTMDB } from '../TMDBContext'

import './App.css'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      guest_id: null,
      genres: null,
      rated_films: {},
    }
  }
  TMDB = new ServiceTMDB()
  componentDidMount() {
    this.TMDB.createGuestSession().then((result) => {
      this.setState({
        guest_id: result.guest_session_id,
      })
    })
    this.TMDB.getGenres().then((result) => {
      this.setState({
        genres: result,
      })
    })
  }

  addRating = (filmId, value) => {
    this.TMDB.addRating(filmId, this.state.guest_id, value).then(() => {
      const ratedFilms = { ...this.state.rated_films }
      ratedFilms[filmId] = value

      this.setState(
        {
          rated_films: ratedFilms,
        },
        () => {
          console.log(this.state.rated_films)
        }
      )
    })
  }

  getRatedFilms = (page) => {
    this.TMDB.getRatedMovies(this.state.guest_id, page).then((result) => {
      return result
    })
  }

  render() {
    return (
      <div className="App">
        <ProviderTMDB
          value={{
            TMDB: this.TMDB,
            genres: this.state.genres,
            addRating: this.addRating,
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
