class FilterList extends HTMLElement {
  constructor () {
    super()
    this.shadowDOM = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.value = this.getAttribute('value') || null
    this.id = this.getAttribute('id') || null
    this.checked = this.getAttribute('checked') || null
    this.render()
  }

  render () {
    this.shadowDOM.innerHTML =
        `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <style> 
            .input-checkbox {
                display: block;
                position: relative;
                padding-left: 35px;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                // eslint-disable-next-line linebreak-style
                -ms-user-select: none;
                user-select: none;
            }
            
            .input-checkbox input {
                position: absolute;
                opacity: 0;
                cursor: pointer;
                height: 0;
                width: 0;
            }
            
            .mark {
                position: absolute;
                top: 0;
                left: 0;
                height: 20px;
                width: 20px;
                background-color: #eee;
            }
            
            .input-checkbox:hover input ~ .mark {
                background-color: #ccc;
            }
            
            .input-checkbox input:checked ~ .mark {
                background-color: #2196F3;
            }
            
            .mark::after {
                content: "";
                position: absolute;
                display: none;
            }
            
            .input-checkbox input:checked ~ .mark:after {
                display: block;
            }
            
            .input-checkbox .mark:after {
                left: 8px;
                top: 4px;
                width: 5px;
                height: 10px;
                border: solid white;
                border-width: 0 3px 3px 0;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
            }
        </style>
        `
    if (this.checked !== null) {
      this.shadowDOM.innerHTML +=
            `
            <label class="input-checkbox mb-2">${this.value}
                <input id="${this.id}" type="checkbox" checked="">
                <span class="mark"></span>
            </label>
            `
    } else {
      this.shadowDOM.innerHTML +=
            `
            <button type="button" id="${this.id}" class="border border-secondary btn btn-light mb-3 rounded-pill"><i class="bi bi-tag"></i> ${this.value}</button>
            `
    }
  }
}

customElements.define('filter-list', FilterList)
