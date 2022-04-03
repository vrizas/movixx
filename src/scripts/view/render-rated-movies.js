import '../components/rated-movie-list.js'
import Data from '../data/data.js'

const renderRatedMovies = async (guestSessionId) => {
  const ratedMovieList = document.querySelectorAll('rated-movie-list')

  for (let i = 0; i < ratedMovieList.length; i++) {
    ratedMovieList[i].movies = await Data.getRatedMovies(await guestSessionId)
  }
}

export default renderRatedMovies
