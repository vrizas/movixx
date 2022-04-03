import 'regenerator-runtime'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './styles/style.css'

import logo from './img/logo.svg'
import tmdb from './img/tmdb.svg'
import dom from './scripts/view/dom'
import renderRatedMovies from './scripts/view/render-rated-movies'
window.$ = $

window.addEventListener('load', async () => {
  document.querySelector('.logo img').setAttribute('src', logo)
  document.querySelector('footer img').setAttribute('src', tmdb)

  const guestSessionId = dom()
  renderRatedMovies(guestSessionId)
})
