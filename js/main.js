// ==============================
// main.js
// Lógica principal de la app
// ==============================

//Cargar header, menu, footer.
function loadFragment(id, path) {
  fetch(path) // el fetch por defecto usa GET que sirve para poder leer archivos estáticos
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    })
    .catch(err => console.error(`Error cargando ${path}:`, err));
}

//ejecutar las cargas anteriores
loadFragment("header", "components/header.html");
loadFragment("menu", "components/menuNavegacion.html");
loadFragment("footer", "components/footer.html");

//Verificar si el usuario está logueado
const user = sessionStorage.getItem("loggedUser");
if (!user) {
  window.location.href = "login.html";
}

//Cargar los libros desde el json y mostrarlos en el catálogo
fetch("data/Libros.json")
  .then(res => res.json())
  .then(libros => {
    const catalogo = document.getElementById("catalogo");
    catalogo.innerHTML = ""; // limpiar antes de mostrar

    libros.forEach(libro => {
      // Crear un elemento custom para cada libro
      const card = document.createElement("product-card");
      card.setAttribute("title", libro.titulo);
      card.setAttribute("author", libro.autor);
      card.setAttribute("price", `$${libro.precio}`);
      card.setAttribute("cover", libro.imagen);

      catalogo.appendChild(card);
    });
  })
  .catch(err => console.error("Error cargando Libros.json:", err));

this.innerHTML = `
  <div class="card">
    <img src="${this.getAttribute("cover")}" alt="Portada del libro">
    <h3>${this.getAttribute("title")}</h3>
    <p>${this.getAttribute("author")}</p>
    <p class="price">${this.getAttribute("price")}</p>
    <button class="add-cart">Agregar al carrito</button>
  </div>
`;
// fragmento reciclado de otro proyecto
this.querySelector(".add-cart").addEventListener("click", () => {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart.push({
    title: this.getAttribute("title"),
    price: this.getAttribute("price")
  });
  sessionStorage.setItem("cart", JSON.stringify(cart));
  alert("Libro agregado al carrito 🛒");
});