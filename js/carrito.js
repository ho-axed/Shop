const carrito = document.querySelector(".carritoclick");
const cerrar = document.querySelector(".cerrarcarrito");
const vercarrito = document.querySelector(".carritoemoji");
carrito.addEventListener("click", () => {
  vercarrito.classList.add("activo");
});
cerrar.addEventListener("click", () => {
  vercarrito.classList.remove("activo");
});
