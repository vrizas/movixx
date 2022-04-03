/* eslint-disable valid-typeof */
import Data from '../data/data.js'

class Storage {
  static checkStorage () {
    if (typeof (Storage) === undefined) {
      alert('Browser Anda tidak mendukung storage')
      return false
    }
    return true
  }

  static checkGuestSessionExpiry () {
    const GUEST_ID = 'GUEST_ID'

    if (this.checkStorage()) {
      const guestId = JSON.parse(localStorage.getItem(GUEST_ID)) || []
      const now = new Date()

      if (guestId.length > 0) {
        if (now.getTime() > guestId[0].expiry) {
          localStorage.removeItem(GUEST_ID)
          return this.setGuestSession()
        }
      }
    }
  }

  static async setGuestSession () {
    const guestId = []
    const GUEST_ID = 'GUEST_ID'

    if (!localStorage.getItem(GUEST_ID)) {
      if (this.checkStorage()) {
        const now = new Date()
        const id = await Data.getGuestSession()
        const data = {
          id: id,
          expiry: now.getTime() + (1000 * 60 * 60 * 24)
        }
        guestId.push(data)
        localStorage.setItem(GUEST_ID, JSON.stringify(guestId))
        return id
      }
    }
  }

  static getGuestSession () {
    const GUEST_ID = 'GUEST_ID'

    if (this.checkStorage()) {
      const data = JSON.parse(localStorage.getItem(GUEST_ID)) || []
      if (data.length > 0) {
        // eslint-disable-next-line no-unreachable-loop
        return data[0].id
      }
    }
  }

  static getRatedMovies () {
    let movies = []
    const RATED_MOVIES = 'RATED_MOVIES'

    const getStorage = () => {
      const data = JSON.parse(localStorage.getItem(RATED_MOVIES)) || []
      movies = data
    }

    const setStorage = async () => {
      getStorage()
      if (this.checkStorage()) {
        const guestSessionId = this.getGuestSession()
        const ratedMovies = await Data.getRatedMovies(guestSessionId)
        if (ratedMovies) {
          let movieExist = false
          ratedMovies.forEach(ratedMovie => {
            movies.forEach(movie => {
              if (ratedMovie.id === movie.id) {
                movieExist = true
              }
            })
            if (!movieExist) {
              movies.push(ratedMovie)
            }
            movieExist = false
          })
        }

        localStorage.setItem(RATED_MOVIES, JSON.stringify(movies))
      }
    }

    setStorage()
    return movies
  }
}

export default Storage
