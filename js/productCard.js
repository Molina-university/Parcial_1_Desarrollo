// ==============================
// productCard.js
// Web Component <product-card>
// Muestra la información de un producto (libro) y permite agregarlo al carrito
// ==============================

class ProductCard extends HTMLElement {
  constructor() {
    super();    

    // Creamos un Shadow DOM 
    const shadow = this.attachShadow({ mode: 'open' });

    fetch('css/card.css')
      .then(res => res.text())
      .then(css => {
        shadow.innerHTML = `
          <style>${css}</style>
          
          <div class="card">
            <img id="cover" alt="Portada del libro" />
            <h3 id="title"></h3>
            <p id="author"></p>
            <p class="price" id="price"></p>
            <button class="add-cart">Agregar al carrito</button>
          </div>
        `;

        // Inicializar después de cargar el HTML
        this.inicializar();
      })
      .catch(err => console.error('Error cargando card.css:', err));
  }

  // Cuando el componente se inserta en el DOM
  connectedCallback() {
    // El contenido se carga de forma asíncrona, 
    // así que esperamos a que esté listo
  }

  // Método para inicializar el componente
  inicializar() {
    this.shadowRoot.getElementById("cover").src = this.getAttribute("cover");
    this.shadowRoot.getElementById("title").textContent = this.getAttribute("title");
    this.shadowRoot.getElementById("author").textContent = this.getAttribute("author");
    this.shadowRoot.getElementById("price").textContent = this.getAttribute("price");

    // Agregar evento al botón del carrito
    const btn = this.shadowRoot.querySelector(".add-cart");
    btn.addEventListener("click", () => {
      let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      cart.push({
        title: this.getAttribute("title"),
        author: this.getAttribute("author"),
        price: this.getAttribute("price"),
        cover: this.getAttribute("cover")
      });
      sessionStorage.setItem("cart", JSON.stringify(cart));
      alert(`"${this.getAttribute("title")}" agregado al carrito 🛒`);
    });
  }
}

// Registrar el nuevo tag <product-card>
customElements.define("product-card", ProductCard);