const BEARER_TOKEN = 'ebf5093333cb8937e5d4b0b12738222b'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
}

async function getResource(url) {
  const res = await fetch(url, options)

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`)
  }

  return await res.json()
}

function transformCard(card) {
  return {
    id: card.id,
    image: card.poster_path,
    title: card.title,
    date: card.release_date,
    tags: card.genre_ids,
    about: card.overview,
    rate: card.vote_average.toFixed(1),
  }
}

async function getGenres() {
  try {
    const res = await getResource(`https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${BEARER_TOKEN}`)
    return res.genres
  } catch {
    throw new Error()
  }
}

async function createGuestSession() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${BEARER_TOKEN}`,
      options
    )
    return await res.json()
  } catch {
    return 'Error createGuestSession()'
  }
}

async function addRating(movie_id, guest_session_id, rate) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    body: `{"value":${rate}}`,
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/rating?guest_session_id=${guest_session_id}&api_key=${BEARER_TOKEN}`,
    options
  )
  return await res.json()
}

async function getRatedMovies(guest_session_id, page) {
  const res = await getResource(
    `https://api.themoviedb.org/3/guest_session/${guest_session_id}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc&api_key=${BEARER_TOKEN}`
  )
  return {
    cards: res.results.map(transformCard),
    totalResults: res.total_results,
  }
}

async function getMovies(movieName, page) {
  const res = await getResource(
    `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=${page}&api_key=${BEARER_TOKEN}`
  )
  return {
    cards: res.results.map(transformCard),
    totalResults: res.total_results,
  }
}

export { getMovies, getRatedMovies, addRating, createGuestSession, getGenres }
