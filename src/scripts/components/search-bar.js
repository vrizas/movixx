class SearchBar extends HTMLElement {
  constructor () {
    super()
    this.shadowDOM = this.attachShadow({ mode: 'open' })
  }

  get keyword () {
    return this.shadowDOM.querySelector('input').value
  }

  set keyword (newValue) {
    const input = this.shadowDOM.querySelector('input')
    input.value = newValue
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadowDOM.innerHTML =
        `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <style> 
            input[type="search"]:focus,
            .btn:focus{   
            border-color: rgba(45, 36, 36, 0.8);
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(45, 36, 36, 0.6);
            outline: 0 none;
            }
        </style>
        <section class="input-group ms-4 mb-4 w-75">
            <input type="search" placeholder="Cari" aria-describedby="button-addon5" class="form-control">
            <div class="input-group-append">
                <button id="button-addon5" type="submit" class="btn btn-dark"><i class="bi bi-search text-light"></i></button>
            </div>
        </section>
        `
  }
}

customElements.define('search-bar', SearchBar)
