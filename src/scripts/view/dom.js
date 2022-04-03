/* eslint-disable no-undef */
import '../components/movie-list.js'
import '../components/filter-list.js'
import '../components/search-bar.js'
import Data from '../data/data.js'
import Storage from '../data/storage.js'

const dom = () => {
  let guestSessionId = null

  $(window).resize(() => {
    if ($(window).width() <= 767) {
      $('nav').hide()
      $('.rated-movie-filter').hide()
      $('header .row').append(`
            <nav class="nav-sm navbar navbar-expand-lg navbar-dark bg-dark pb-0">
                <div class="container-fluid ps-0">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
                        <ul class="navbar-nav mt-3 bg-light rounded px-3 py-2">
                            <li class="nav-item dropdown">
                            <a class="nav-link text-dark" href="#search" id="navbarDarkDropdownMenuLink" role="button">
                                Cari Film
                            </a>
                            <a class="nav-link text-dark" href="#rated" id="navbarDarkDropdownMenuLink" role="button">
                                Telah Dinilai
                            </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            `)

      $('.nav-link:nth-child(1)').click(() => {
        $('.search-movie').show()
        $('.rated-movie').hide()
      })

      $('.nav-link:nth-child(2)').click(() => {
        $('.rated-movie').show()
        $('.search-movie').hide()
      })
    } else {
      $('.nav-lg').show()
      $('.nav-sm').hide()
      $('.rated-movie-filter').show()
    }
  })

  $('nav li:nth-child(1)').click(() => {
    $('.search-movie').show()
    $('.rated-movie').hide()
  })

  $('nav li:nth-child(2)').click(() => {
    $('.rated-movie').show()
    $('.search-movie').hide()
  })

  $('.open-rated-page').click(() => {
    $('.rated-movie').show()
    $('.search-movie').hide()
  })

  const movieList = document.querySelector('movie-list')
  const filterList = document.querySelectorAll('filter-list')
  const filterPopuler = filterList[0].shadowRoot.querySelector('#populer')
  const filterAction = filterList[1].shadowRoot.querySelector('#action')
  const filterComedy = filterList[2].shadowRoot.querySelector('#comedy')
  const filterScifi = filterList[3].shadowRoot.querySelector('#sci-fi')
  const filterRomance = filterList[4].shadowRoot.querySelector('#romance')
  const filterHorror = filterList[5].shadowRoot.querySelector('#horror')
  const filterThriller = filterList[6].shadowRoot.querySelector('#thriller')
  const searchBar = document.querySelector('search-bar')

  if (Storage.getGuestSession()) {
    guestSessionId = Storage.getGuestSession()
  } else {
    guestSessionId = Storage.setGuestSession()
  }

  const renderData = async (popular, genre) => {
    movieList.movies = {
      movies: await Data.getMovie(popular, genre),
      ratedMovies: await Data.getRatedMovies(await guestSessionId),
      guestSessionId: await guestSessionId
    }
  }

  filterPopuler.addEventListener('click', () => {
    searchBar.keyword = ''
    if (filterPopuler.checked === false) {
      if (filterAction.classList.contains('btn-light') &&
            filterComedy.classList.contains('btn-light') &&
            filterScifi.classList.contains('btn-light') &&
            filterRomance.classList.contains('btn-light') &&
            filterHorror.classList.contains('btn-light') &&
            filterThriller.classList.contains('btn-light')) {
        renderData(false, '')
      } else if (filterAction.classList.contains('btn-dark')) {
        renderData(false, 'action')
      } else if (filterComedy.classList.contains('btn-dark')) {
        renderData(false, 'comedy')
      } else if (filterScifi.classList.contains('btn-dark')) {
        renderData(false, 'sci-fi')
      } else if (filterRomance.classList.contains('btn-dark')) {
        renderData(false, 'romance')
      } else if (filterHorror.classList.contains('btn-dark')) {
        renderData(false, 'horror')
      } else if (filterThriller.classList.contains('btn-dark')) {
        renderData(false, 'thriller')
      }
    } else if (filterPopuler.checked === true) {
      if (filterAction.classList.contains('btn-light') &&
            filterComedy.classList.contains('btn-light') &&
            filterScifi.classList.contains('btn-light') &&
            filterRomance.classList.contains('btn-light') &&
            filterHorror.classList.contains('btn-light') &&
            filterThriller.classList.contains('btn-light')) {
        renderData(true, '')
      } else if (filterAction.classList.contains('btn-dark')) {
        renderData(true, 'action')
      } else if (filterComedy.classList.contains('btn-dark')) {
        renderData(true, 'comedy')
      } else if (filterScifi.classList.contains('btn-dark')) {
        renderData(true, 'sci-fi')
      } else if (filterRomance.classList.contains('btn-dark')) {
        renderData(true, 'romance')
      } else if (filterHorror.classList.contains('btn-dark')) {
        renderData(true, 'horror')
      } else if (filterThriller.classList.contains('btn-dark')) {
        renderData(true, 'thriller')
      }
    }
  })

  for (let i = 1; i < filterList.length; i++) {
    filterList[i].shadowRoot.querySelector('button').addEventListener('click', () => {
      searchBar.keyword = ''
      if (filterList[i].shadowRoot.querySelector('button').classList.contains('btn-light')) {
        filterList[i].shadowRoot.querySelector('button').classList.remove('btn-light')
        filterList[i].shadowRoot.querySelector('button').classList.add('btn-dark')
        filterList[i].shadowRoot.querySelector('button').classList.add('text-light')

        for (let j = i + 1; j < filterList.length; j++) {
          filterList[j].shadowRoot.querySelector('button').classList.remove('btn-dark')
          filterList[j].shadowRoot.querySelector('button').classList.add('btn-light')
          filterList[j].shadowRoot.querySelector('button').classList.remove('text-light')
        }
        for (let j = i - 1; j >= 1; j--) {
          filterList[j].shadowRoot.querySelector('button').classList.remove('btn-dark')
          filterList[j].shadowRoot.querySelector('button').classList.add('btn-light')
          filterList[j].shadowRoot.querySelector('button').classList.remove('text-light')
        }

        if (filterPopuler.checked === false) {
          renderData(false, filterList[i].shadowRoot.querySelector('button').id)
        } else if (filterPopuler.checked === true) {
          renderData(true, filterList[i].shadowRoot.querySelector('button').id)
        }
      } else {
        filterList[i].shadowRoot.querySelector('button').classList.remove('btn-dark')
        filterList[i].shadowRoot.querySelector('button').classList.add('btn-light')
        filterList[i].shadowRoot.querySelector('button').classList.remove('text-light')

        if (filterPopuler.checked === false) {
          renderData(false, '')
        } else if (filterPopuler.checked === true) {
          renderData(true, '')
        }
      }
    })
  }

  searchBar.shadowRoot.querySelector('button').addEventListener('click', async () => {
    for (let i = 1; i < filterList.length; i++) {
      filterList[i].shadowRoot.querySelector('button').classList.remove('btn-dark')
      filterList[i].shadowRoot.querySelector('button').classList.add('btn-light')
      filterList[i].shadowRoot.querySelector('button').classList.remove('text-light')
    }

    filterPopuler.checked = false

    try {
      const result = await Data.searchMovie(searchBar.keyword)
      movieList.movies = {
        movies: result,
        ratedMovies: await Data.getRatedMovies(await guestSessionId),
        guestSessionId: await guestSessionId
      }
    } catch (message) {
      movieList.renderError(message)
    }
  })

  searchBar.shadowRoot.querySelector('input').addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
      for (let i = 1; i < filterList.length; i++) {
        filterList[i].shadowRoot.querySelector('button').classList.remove('btn-dark')
        filterList[i].shadowRoot.querySelector('button').classList.add('btn-light')
        filterList[i].shadowRoot.querySelector('button').classList.remove('text-light')
      }

      filterPopuler.checked = false

      try {
        const result = await Data.searchMovie(searchBar.keyword)
        movieList.movies = {
          movies: result,
          ratedMovies: await Data.getRatedMovies(await guestSessionId),
          guestSessionId: await guestSessionId
        }
      } catch (message) {
        movieList.renderError(message)
      }
    }
  })

  const guestId = Storage.checkGuestSessionExpiry()
  if (guestId) {
    guestSessionId = guestId
  }
  renderData(true, '')
  return guestSessionId
}

export default dom
