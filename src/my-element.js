import { LitElement, css, html } from 'lit'

export class MyElement extends LitElement {
  static styles = css`
    

    :host{
      --clr-main: #4b33a8;
      --clr-main-light: #785ce9;
      --clr-white: #ececec;
      --clr-gray: #e2e2e2;
      --clr-red: #961818;
    }
    *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Rubik', sans-serif;
    }

    h1, h2, h3, h4, h5, h6, p, a, input, textarea, ul{
      margin: 0;
      padding: 0;
    }

    ul {
      list-style-type: none;
    }

    a{
      text-decoration: none;
      color: var(--clr-main);
    }

    .wrapper {
      display: grid;
      grid-template-columns: 1fr 4fr;
      background-color: var(--clr-main);

    }
    aside{
      padding: 2rem;
      padding-right: 0;
      color: white;
      position: sticky;
      top: 0;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .logo{
      font-weight: 400;
      font-size: 1.3rem;
    }

    .menu{
      display: flex;
      flex-direction: column;
      gap: .5rem;
    }

    .boton-menu{
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

    .boton-menu.active{
      background-color: var(--clr-white);
      color: var(--clr-main);
      border-top-left-radius: 1rem;
      border-bottom-left-radius: 1rem;
      position: relative;
    }

    .boton-menu.active::before{
      content: '';
      position: absolute;
      width: 1rem;
      height: 2rem;
      background-color: transparent;
      border-bottom-right-radius: .5rem;
      box-shadow: 0 1rem 0 var(--clr-white);
    }

    .boton-menu.active::after{
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

    .boton-carrito{
      margin-top: 2rem;
    }

    .numerito{
      background-color: var(--clr-white);
      color: var(--clr-main);
      padding: .15rem .25rem;
      border-radius: .25rem;
    }

    .boton-carrito.active .numerito{
      background-color: var(--clr-main);
      color: var(--clr-white);
    }

    .texto-footer{
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

    .titulo-principal{
      color: var(--clr-main);
      margin-bottom: 2rem;

    }

    .contenedor-productos {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 1rem;
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
  `;

  static properties = {
    abrigos: { type: Array },
    camisetas: { type: Array },
    pantalones: { type: Array },
  };

  constructor() {
    super();
    this.abrigos = [];
    this.camisetas = [];
    this.pantalones = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  async fetchData(category) {
    const url = "https://file.notion.so/f/f/eaa1771c-fc19-40d4-8527-37ca1caab8fa/8f181ea0-47f7-49a5-9b85-48db35d8ec38/Documentos_DB.json?id=a21b973c-4a2b-4e71-b3f3-1b6e38a01f05&table=block&spaceId=eaa1771c-fc19-40d4-8527-37ca1caab8fa&expirationTimestamp=1715983200000&signature=bKCU1aN7ehQWRZuMrzXneZB3f7zYUNNl8sNhZD3IwDk&downloadName=Documentos_DB.json"; // Reemplaza esta URL con la URL real de tu JSON
    try {
      const response = await fetch(url);
      const data = await response.json();
      if(data.abrigo && Array.isArray(data.abrigo)) this.abrigos = data.abrigo;
      if(data.camiseta && Array.isArray(data.camiseta)) this.camisetas = data.camiseta;
      if(data.pantalon && Array.isArray(data.pantalon)) this.pantalones = data.pantalon;

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  render() {
    return html`

    <div class="wrapper">
    <header class="header-mobile">
        <h1 class="logo">CarpiShop</h1>
        <button class="open-menu" id="open-menu">
            <i class="bi bi-list"></i>
        </button>
    </header>
    <aside>
        <button class="close-menu" id="close-menu">
            <i class="bi bi-x"></i>
        </button>
        <header>
            <h1 class="logo">CarpiShop</h1>
        </header>
        <nav>
            <ul class="menu">
                <li>
                    <button id="todos" class="boton-menu boton-categoria active"><i class='bx bxs-hand-right'></i>Todos los productos</button>
                </li>
                <li>
                    <button id="abrigos" class="boton-menu boton-categoria"><i class="bi bi-hand-index-thumb"></i> Abrigos</button>
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
        <div id="contenedor-productos" class="contenedor-productos">
            <!-- Esto se va a rellenar con JS -->
            
        </div>
    </main>
</div>
<h1>Productos</h1>
      <h2>Abrigos</h2>
      <div>
        ${Array.isArray(this.abrigos) ? this.abrigos.map(
          abrigo => html`
            <div class="product">
              <img src="${abrigo.imagen}" alt="${abrigo.nombre}" />
              <p>${abrigo.nombre}</p>
              <p>${abrigo.precio} COP</p>
            </div>
          `
        ) : 'No se encontraron abrigos'}
      </div>
      <h2>Camisetas</h2>
      <div>
        ${Array.isArray(this.camisetas) ? this.camisetas.map(
          camiseta => html`
            <div class="product">
              <img src="${camiseta.imagen}" alt="${camiseta.nombre}" />
              <p>${camiseta.nombre}</p>
              <p>${camiseta.precio} COP</p>
            </div>
          `
        ) : 'No se encontraron camisetas'}
      </div>
      <h2>Pantalones</h2>
      <div>
        ${Array.isArray(this.pantalones) ? this.pantalones.map(
          pantalon => html`
            <div class="product">
              <img src="${pantalon.imagen}" alt="${pantalon.nombre}" />
              <p>${pantalon.nombre}</p>
              <p>${pantalon.precio} COP</p>
            </div>
          `
        ) : 'No se encontraron pantalones'}
      </div>
      
    `;
  }
}


customElements.define('my-element', MyElement)
