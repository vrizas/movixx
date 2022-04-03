/* eslint-disable prefer-promise-reject-errors */
class Data {
  static getMovie (populer, genre) {
    const baseUrl = 'https://api.themoviedb.org/3/'
    const filterUrl = 'discover/movie?api_key=355b33626b5ae08fe7b5850c1225f1ba&language=id-ID&'
    let reqUrl = ''

    if (populer === false && genre === '') {
      reqUrl = filterUrl + 'sort_by=popularity.desc&include_adult=false&page=1&vote_count.lte=20&vote_average.gte=1'
    } else if (populer === true && genre === '') {
      reqUrl = filterUrl + 'sort_by=popularity.desc&include_adult=false&page=1'
    } else if (populer === false && genre === 'action') {
      reqUrl = filterUrl + 'sort_by=popularity.desc&include_adult=false&page=100&vote_count.lte=20&vote_average.gte=1&with_genres=28'
    } else if (populer === true && genre === 'action') {
      reqUrl = filterUrl + 'sort_by=popularity.desc&include_adult=false&page=1&with_genres=28'
    } else if (populer === false && genre === 'comedy') {
      reqUrl = filterUrl + 'sort_by=popularity.desc&include_adult=false&page=100&vote_count.lte=20&vote_average.gte=1&with_genres=35'
    } else if (populer === true && genre === 'comedy') {
      reqUrl = filterUrl + 'sort_by=popularity.desc&include_adult=false&page=1&with_genres=35'
    } else if (populer === false && genre === 'sci-fi') {
      reqUrl = filterUrl + 'sort_by=popularity.desc&include_adult=false&page=100&vote_count.lte=20&vote_average.gte=1&with_genres=878'
    } else if (populer === true && genre === 'sci-fi') {
      reqUrl = filterUrl + 'sort_by=popularity.desc&include_adult=false&page=1&with_genres=878'
    } else if (populer === false && genre === 'romance') {
      reqUrl = filterUrl + 'sort_by=popularity.desc&include_adult=false&page=101&vote_count.lte=20&vote_average.gte=1&with_genres=10749'
    } else if (populer === true && genre === 'romance') {
      reqUrl = filterUrl + 'sort_by=popularity.desc&include_adult=false&page=1&with_genres=10749'
    } else if (populer === false && genre === 'horror') {
      reqUrl = filterUrl + 'sort_by=popularity.desc&include_adult=false&page=100&vote_count.lte=20&vote_average.gte=1&with_genres=27'
    } else if (populer === true && genre === 'horror') {
      reqUrl = filterUrl + 'sort_by=popularity.desc&include_adult=false&page=1&with_genres=27'
    } else if (populer === false && genre === 'thriller') {
      reqUrl = filterUrl + 'sort_by=popularity.desc&include_adult=false&page=100&vote_count.lte=20&vote_average.gte=1&with_genres=53'
    } else if (populer === true && genre === 'thriller') {
      reqUrl = filterUrl + 'sort_by=popularity.desc&include_adult=false&page=1&with_genres=53'
    }

    return fetch(baseUrl + reqUrl)
      .then(response => response.json())
      .then(responseJson => Promise.resolve(responseJson.results))
  }

  static getRatedMovies (guestSessionId) {
    return fetch(`https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=355b33626b5ae08fe7b5850c1225f1ba&language=en-US&sort_by=created_at.desc`)
      .then(response => response.json())
      .then(responseJson => Promise.resolve(responseJson.results))
  }

  static searchMovie (keyword) {
    const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=355b33626b5ae08fe7b5850c1225f1ba&language=en-US&query='
    if (keyword.length === 0) {
      return fetch('https://api.themoviedb.org/3/discover/movie?api_key=355b33626b5ae08fe7b5850c1225f1ba&language=id-ID&sort_by=popularity.desc&include_adult=false&page=1&vote_count.lte=20&vote_average.gte=1')
        .then(response => response.json())
        .then(responseJson => Promise.resolve(responseJson.results))
    }
    return fetch(searchUrl + keyword)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.results.length > 0) {
          return Promise.resolve(responseJson.results)
        } else {
          return Promise.reject(`${keyword} tidak ditemukan, cobalah dengan kata kunci lain`)
        }
      })
  }

  static getGuestSession () {
    return fetch('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=355b33626b5ae08fe7b5850c1225f1ba')
      .then(response => response.json())
      .then(responseJson => Promise.resolve(responseJson.guest_session_id))
  }

  static rateMovie (value, guestSessionId, movieId) {
    return fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=355b33626b5ae08fe7b5850c1225f1ba&guest_session_id=${guestSessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(value)
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status_code === 1) {
          return Promise.resolve('Penilaian berhasil dilakukan')
        } else {
          return Promise.reject('Ada yang salah, penilaian gagal')
        }
      })
  }
}

export default Data
