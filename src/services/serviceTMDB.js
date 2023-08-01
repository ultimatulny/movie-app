class ServiceTMDB {
  _options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmY1MDkzMzMzY2I4OTM3ZTVkNGIwYjEyNzM4MjIyYiIsInN1YiI6IjY0YzAxOGI3MTc0OTczMDBjNGQ4ODc1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JOSLieHiv2eFmrX00R732Z9Qq653KwywbC0h3BQopTU',
    },
  }

  async getResource(url) {
    const res = await fetch(url, this._options)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }

    return await res.json()
  }

  async getMovies(movieName, page) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=${page}`
    )
    return {
      cards: res.results.map(this._transformCard),
      totalResults: res.total_results,
    }
  }

  _transformCard(card) {
    return {
      id: card.id,
      image: card.poster_path,
      title: card.title,
      date: card.release_date,
      tags: card.genre_ids,
      about: card.overview,
    }
  }
}

export default ServiceTMDB
