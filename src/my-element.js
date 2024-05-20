import { LitElement, css, html } from 'lit';

export class MyElement extends LitElement {
  static styles = css`
    :host {
      --clr-main: #4b33a8;
      --clr-main-light: #785ce9;
      --clr-white: #ececec;
      --clr-gray: #e2e2e2;
      --clr-red: #961818;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Rubik', sans-serif;
    }

    ul {
      list-style-type: none;
    }

    .wrapper {
      display: grid;
      grid-template-columns: 1fr 4fr;
      background-color: var(--clr-main);
    }

    aside {
      padding: 2rem;
      padding-right: 0;
      color: var(--clr-white);
      position: sticky;
      top: 0;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .logo {
      font-weight: 400;
      font-size: 1.3rem;
    }

    .menu {
      display: flex;
      flex-direction: column;
      gap: .5rem;
    }

    .boton-menu {
      background-color: transparent;
      border: 0;
      color: var(--clr-white);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 1rem;
      font-weight: 600;
      padding: 1rem;
      font-size: .85rem;
      width: 100%;
    }

    .boton-menu.active {
      background-color: var(--clr-white);
      color: var(--clr-main);
      border-top-left-radius: 1rem;
      border-bottom-left-radius: 1rem;
      position: relative;
    }

    .boton-menu.active::before {
      content: '';
      position: absolute;
      width: 1rem;
      height: 2rem;
      bottom: 100%;
      right: 0;
      background-color: transparent;
      border-bottom-right-radius: .5rem;
      box-shadow: 0 1rem 0 var(--clr-white);
    }

    .boton-menu.active::after {
      content: '';
      position: absolute;
      width: 1rem;
      height: 2rem;
      top: 100%;
      right: 0;
      background-color: transparent;
      border-top-right-radius: .5rem;
      box-shadow: 0 -1rem 0 var(--clr-white);
    }

    .boton-carrito {
      margin-top: 2rem;
    }

    .numerito {
      background-color: var(--clr-white);
      color: var(--clr-main);
      padding: .15rem .25rem;
      border-radius: .25rem;
    }

    .boton-carrito.active .numerito {
      background-color: var(--clr-main);
      color: var(--clr-white);
    }

    .texto-footer {
      color: var(--clr-main-light);
      font-size: .85rem;
    }

    main {
      background-color: var(--clr-white);
      margin: 1rem;
      margin-left: 0;
      border-radius: 2rem;
      padding: 3rem;
    }

    .titulo-principal {
      color: var(--clr-main);
      margin-bottom: 2rem;
    }

    .contenedor-productos {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
    }

    .product {
      border: 1px solid #ccc;
      padding: 10px;
      margin: 10px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .product img {
      max-width: 100px;
    }

    .producto-imagen {
      max-width: 100%;
      border-radius: 1rem;
    }

    .producto-detalles {
      background-color: var(--clr-main);
      color: var(--clr-white);
      padding: .5rem;
      border-radius: 1rem;
      margin-top: -2rem;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: .25rem;
    }

    .producto-titulo {
      font-size: 1rem;
    }

    .producto-agregar {
      border: 0;
      background-color: var(--clr-white);
      color: var(--clr-main);
      padding: .4rem;
      text-transform: uppercase;
      border-radius: 2rem;
      cursor: pointer;
      border: 2px solid var(--clr-white);
      transition: background-color .2s, color .2s;
    }

    .producto-agregar:hover {
      background-color: var(--clr-main);
      color: var(--clr-white);
    }
  `;

  static properties = {
    abrigos: { type: Array },
    camisetas: { type: Array },
    pantalones: { type: Array },
    categoriaSeleccionada: { type: String },

  };

  constructor() {
    super();
    this.abrigos = [];
    this.camisetas = [];
    this.pantalones = [];
    this.categoriaSeleccionada = 'todos';

  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  async fetchData() {
    try {
      // const abrigosResponse = await fetch('http://localhost:5501/abrigo');
      // const camisetasResponse = await fetch('http://localhost:5501/camiseta');
      // const pantalonesResponse = await fetch('http://localhost:5501/pantalon');
      // this.abrigos = await abrigosResponse.json();
      // this.camisetas = await camisetasResponse.json();
      // this.pantalones = await pantalonesResponse.json();
      const response = await fetch('http://localhost:5501/articles');
      const data = await response.json();
      this.abrigos = await data.abrigo;
      this.camisetas = data.camiseta;
      this.pantalones = data.pantalon;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  render() {

    let productos = [];
    switch (this.categoriaSeleccionada) {
      case 'abrigos':
        productos = this.abrigos;
        break;
      case 'camisetas':
        productos = this.camisetas;
        break;
      case 'pantalones':
        productos = this.pantalones;
        break;
      default:
        productos = [...this.abrigos, ...this.camisetas, ...this.pantalones];
    }
    return html`
      <div class="wrapper">
        <aside>
          <header>
            <h1 class="logo">CampusLands</h1>
          </header>
          <nav>
            <ul class="menu">
              <li>
                <button id="todos" class="boton-menu boton-categoria active"><i class='bx bxs-hand-right'></i>Todos los productos</button>
              </li>
              <li>
                <button @click=${() => this.cambiarCategoria('abrigos')} id="abrigos" class="boton-menu boton-categoria"><i class="bi bi-hand-index-thumb"></i> Abrigos</button>
              </li>
              <li>
                <button id="camisetas" class="boton-menu boton-categoria"><i class="bi bi-hand-index-thumb"></i> Camisetas</button>
              </li>
              <li>
                <button id="pantalones" class="boton-menu boton-categoria"><i class="bi bi-hand-index-thumb"></i> Pantalones</button>
              </li>
              <li>
                <a class="boton-menu boton-carrito" href="#">
                  <i class="bi bi-cart-fill"></i> Carrito <span id="numerito" class="numerito">0</span>
                </a>
              </li>
            </ul>
          </nav>
          <footer>
            <p class="texto-footer">© 2022 Carpi Coder</p>
          </footer>
        </aside>
      <main>
        <h2 class="titulo-principal" id="titulo-principal">Todos los productos</h2>
        <div class="contenedor-productos">
          ${this.abrigos.map(
            abrigo => html`
              <div class="product">
                <img class="producto-imagen" src="${abrigo.imagen}" alt="${abrigo.nombre}" />
                <div class="producto-detalles">
                  <p class="producto-titulo">${abrigo.nombre}</p>
                  <p>${abrigo.precio} COP</p>
                  <button class="producto-agregar">Agregar al carrito</button>
                </div>
              </div>
            `
          )}
          ${this.camisetas.map(
            camiseta => html`
              <div class="product">
                <img class="producto-imagen" src="${camiseta.imagen}" alt="${camiseta.nombre}" />
                <div class="producto-detalles">
                  <p class="producto-titulo">${camiseta.nombre}</p>
                  <p>${camiseta.precio} COP</p>
                  <button class="producto-agregar">Agregar al carrito</button>
                </div>
              </div>
            `
          )}
          ${this.pantalones.map(
            pantalon => html`
              <div class="product">
                <img class="producto-imagen" src="${pantalon.imagen}" alt="${pantalon.nombre}" />
                <div class="producto-detalles">
                  <p class="producto-titulo">${pantalon.nombre}</p>
                  <p>${pantalon.precio} COP</p>
                  <button class="producto-agregar">Agregar al carrito</button>
                </div>
              </div>
            `
          )}
        </div>
      </main>
      </div>
    `;
    }
  cambiarCategoria(categoria) {
    this.categoriaSeleccionada = categoria;
  }
}

customElements.define('my-element', MyElement);