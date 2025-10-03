// ==============================
// login.js
// Manejo de inicio de sesión
// ==============================

const FORM = document.getElementById("loginForm");
const ERROR_MSG = document.getElementById("errorMsg");

FORM.addEventListener("submit", async function (e) {
  e.preventDefault(); //Prevenir envío del formulario

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  try {
    // Leer usuarios desde JSON
    const res = await fetch("data/Usuarios.json");
    if (!res.ok) throw new Error("No se pudo cargar Usuarios.json");

    const usuarios = await res.json();

    //Buscar coincidencia
    const user = usuarios.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      //Guardar datos básicos en sessionStorage
      sessionStorage.setItem("loggedUser", JSON.stringify({
        username: user.username,
        role: user.role
      }));

      // Redirigir a página principal
      window.location.href = "index.html";
    } else {
      ERROR_MSG.textContent = "Revisa las credenciales porque ese usuario no existe aca pa";
      ERROR_MSG.style.display = "block";
    }
  } catch (err) { // Capturar errores de fetch o JSON
    console.error("Error en login:", err);
    ERROR_MSG.textContent = "Error al validar usuarios. Verifica la consola.";
    ERROR_MSG.style.display = "block";
  }
});