import { LitElement, css, html } from 'lit'


export class MyElement extends LitElement {
  static styles = css`
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
