class ratedMovieList extends HTMLElement {
  set movies (movies) {
    this.quantity = this.getAttribute('quantity') || null
    this._movies = movies
    this.render()
  }

  get movies () {
    return this._movies
  }

  render () {
    this.innerHTML =
        `
        <style>
            .movie-img-sm {
                width: 120px;
            }

            .movie-img-lg {
                width: 160px;
            }
            
            .movie-img-md {
                width: 147px;
            }
            
            .yellow-star {
                color: var(--color-rating);
            }

            .error-message {
              font-size: 15px;
              padding: 0;
            }

        </style>
        `

    if (this.quantity === '3') {
      this.innerHTML +=
            `
            <div class="col-md-12">
                <section class="container-fluid">
                    <div class="row"></div>
                </section>
            </div>
            `
      if (this._movies.length > 0) {
        for (let i = 0; i < 3; i++) {
          if (this._movies[i] !== undefined) {
            this.querySelector('.row').innerHTML +=
            `
            <div class="shadow rounded col-7 mb-3 me-4 py-2 px-2 movie-img-md">
                <div class="d-flex justify-content-center">
                    <img class="movie-img-sm" src="https://image.tmdb.org/t/p/w500/${this._movies[i].poster_path}" alt="${this._movies[i].title}">
                </div>
                <div class="mt-1">
                    <i class="bi bi-star-fill yellow-star"></i>
                    <span>${this._movies[i].vote_average}/10</span>
                    <button class="btn btn-modal" disabled><i class="bi bi-star text-warning"></i></button>
                </div>
                <h6>${this._movies[i].title}</h6>
            </div>
            `
          }
        }
      } else {
        this.querySelector('.row').innerHTML +=
        `
        <p class="error-message">Belum pernah menilai film</p>
        `
      }
    } else {
      this.innerHTML +=
            `
            <div class="col-12 px-5">
                <section class="container-fluid">
                    <div class="row px-2"></div>
                </section>
            </div>
            `
      if (this._movies.length > 0) {
        this._movies.forEach(movie => {
          this.querySelector('.row').innerHTML +=
        `
        <div class="shadow rounded col-2 me-4 ms-3 mb-4 py-2 movie-img-lg">
            <div class="d-flex justify-content-center">
                <img class="movie-img-md" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            </div>
            <div class="mt-1">
                <i class="bi bi-star-fill yellow-star"></i>
                <span>${movie.vote_average}/10</span>
                <button class="btn btn-modal" disabled><i class="bi bi-star text-warning"></i></button>
            </div>
            <h6>${movie.title}</h6>
        </div>  
        `
        })
      } else {
        this.querySelector('.row').innerHTML +=
        `
        <p class="error-message">Belum pernah menilai film</p>
        `
      }
    }
  }

  renderError (message) {
    this.querySelector('.row').innerHTML = `<h6 class="">${message}</h6>`
  }
}

customElements.define('rated-movie-list', ratedMovieList)
