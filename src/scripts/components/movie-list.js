/* eslint-disable no-undef */
import Storage from '../data/storage.js'
import Data from '../data/data.js'
import renderRatedMovies from '../view/render-rated-movies'

class MovieList extends HTMLElement {
  set movies (data) {
    this._guestSessionId = data.guestSessionId
    this._ratedMovies = data.ratedMovies
    this._movies = data.movies
    this.render()
  }

  get movies () {
    return this._movies
  }

  render () {
    this.innerHTML =
        `
        <style>
            .movie-img-md {
                width: 147px;
            }
            
            .rating-star {
                cursor: pointer;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                color: #6c757d;
                width: fit-content;
            }
            
            .rating-star i {
                font-size: 30px;
                padding: 5px;
            }
            
            .rating-star:hover > i::before {
                color:var(--color-rating);
            }
            
            .rating-star > i:hover ~ i::before {
                color: var(--color-grey);
            }
            
            .rating-star i.active {
                color:var(--color-rating);
            }
            
            .yellow-star {
                color: var(--color-rating);
            }

            .btn-modal:focus{   
                border-color: transparent;
                box-shadow: none;
                outline: 0 none;
            }

            .btn-modal:hover i{   
                color: var(--color-rating);
            }

            .btn-close {
              top: 20px;
              right: 20px;
            }

            #flashMessage {
                position: fixed;
                top: 75px;
                right: 20px;
                border-radius: 3px;
                padding: 15px 25px;
                transform: translateX(400px);
                z-index: 999999;
            }

            #flashMessage i {
                position: absolute;
                top: 3px;
                right: 3px;
                font-size: 18px;
                cursor: pointer;
            }
            
            #flashMessage button {
                font-size: 12px;
                background-color: #f0ad4e;
            }
            
            .flash-button {
                display: none;
                width: 100%;
                text-align: center;
                margin-top: 2px;
            }
            
            .pop-up {
                animation: popUp 5s;
                animation-fill-mode: forwards;
            }

            @keyframes popUp {
                10% {transform: translateX(0);}
                30% {transform: translateX(0);}
                70% {transform: translateX(2px);}
                80% {transform: translateX(0px);}
                85% {transform: translateX(5px);}
                100% {transform: translateX(400px);}
            }
        </style>
        <section id="flashMessage" class="bg-success text-light">
            <i class="bi bi-x"></i>
            <h6 class="mb-0"></h6>
        </section>
        <section class="container-fluid">
            <div class="row justify-content-center justify-content-sm-start"></div>
        </section>
        `

    this._movies.forEach((movie, index) => {
      this.querySelector('.row').innerHTML +=
            `
            <div class="shadow rounded col-2 me-4 mb-4 py-2 movie-img-lg">
                <div class="d-flex justify-content-center">
                    <img class="movie-img-md" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                </div>
                <div class="mt-1">
                    <i class="bi bi-star-fill yellow-star"></i>
                    <span>${movie.vote_average}/10</span>
                    <button class="btn btn-modal ${movie.id}" data-bs-toggle="modal" data-bs-target="#rate-${movie.id}"><i class="bi bi-star"></i></button>
                </div>
                <h6>${movie.title}</h6>
            </div>

            <div class="modal fade" id="rate-${movie.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header border-0 mt-2 justify-content-center position-relative">
                      <h5 class="modal-title text-dark" id="exampleModalLabel">Beri Penilaian</h5>
                      <button type="button" class="btn-close position-absolute border-0 shadow-none btn-close-${index}" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex flex-column align-items-center">
                        <h6>${movie.title}</h6>
                        <div class="rating-star rating-star-${index}">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                        </div>
                    </div>
                    <div class="modal-footer justify-content-center border-0 mb-2">
                        <button type="button" id="${movie.id}" class="btn-rate btn btn-dark border-0 shadow-none text-light w-50" data-bs-dismiss="modal">Kirim</button>
                    </div>
                </div>
                </div>
            </div>
            `
    })

    const rate = {
      value: null
    }
    const rateButtons = this.querySelectorAll('.btn-rate')
    for (let i = 0; i < rateButtons.length; i++) {
      rateButtons[i].addEventListener('click', async (event) => {
        const element = this.querySelector('#flashMessage h6')
        const closeButton = this.querySelector('#flashMessage i')
        const guestId = Storage.checkGuestSessionExpiry()
        if (guestId) {
          this._guestSessionId = guestId
        }
        try {
          const message = await Data.rateMovie(rate, this._guestSessionId, event.target.id)
          this.querySelectorAll('.btn-modal')[i].setAttribute('disabled', '')
          this.querySelectorAll('.btn-modal i')[i].classList.add('text-warning')

          element.innerText = message
          if (element.parentElement.classList.contains('bg-danger')) {
            element.parentElement.classList.remove('bg-danger')
            element.parentElement.classList.add('bg-success')
          }
        } catch (message) {
          element.innerText = message
          if (element.parentElement.classList.contains('bg-success')) {
            element.parentElement.classList.remove('bg-success')
            element.parentElement.classList.add('bg-danger')
          }
        }

        closeButton.addEventListener('click', (e) => {
          e.target.parentElement.classList.remove('pop-up')
        })

        element.parentElement.classList.add('pop-up')
        setTimeout(function () {
          element.parentElement.classList.remove('pop-up')
        }, 5000)

        renderRatedMovies(this._guestSessionId)
      })
    }

    for (let i = 0; i < rateButtons.length; i++) {
      this._ratedMovies.forEach(ratedMovie => {
        if (this.querySelectorAll('.btn-modal')[i].classList.contains(ratedMovie.id)) {
          this.querySelectorAll('.btn-modal')[i].setAttribute('disabled', '')
          this.querySelectorAll('.btn-modal i')[i].classList.add('text-warning')
        }
      })
    }

    for (let i = 0; i < 20; i++) {
      $('.rating-star-' + i + ' i:nth-child(1)').click((event) => {
        event.target.style.color = 'var(--color-rating)'
        $('.rating-star-' + i + ' i:gt(1)').css('color', 'var(--color-grey)')
        rate.value = 1.0
      })

      for (let j = 2; j < 10; j++) {
        $('.rating-star-' + i + ' i:nth-child(' + j + ')').click((event) => {
          event.target.style.color = 'var(--color-rating)'
          $('.rating-star-' + i + ' i:lt(' + j + ')').css('color', 'var(--color-rating)')
          $('.rating-star-' + i + ' i:gt(' + (j - 1) + ')').css('color', 'var(--color-grey)')
          rate.value = j + 0.0
        })
      }

      $('.rating-star-' + i + ' i:nth-child(10)').click((event) => {
        event.target.style.color = 'var(--color-rating)'
        $('.rating-star-' + i + ' i:lt(10)').css('color', 'var(--color-rating)')
        rate.value = 10.0
      })

      $('.btn-close-' + i).click(() => {
        $('.rating-star-' + i + ' > i').css('color', 'var(--color-grey)')
      })
    }
  }

  renderError (message) {
    this.querySelector('.row').innerHTML = `<h6 class="">${message}</h6>`
  }
}

customElements.define('movie-list', MovieList)
