const productos = [
  {
    id: 1,
    nombre: "Refractor Celestron Travelscope 70az",
    precio: 295351,
    img: "https://http2.mlstatic.com/D_NQ_NP_815342-MLU73099645711_112023-O.webp",
    stock: 3,
    categoria: "Telescopios",
  },
  {
    id: 2,
    nombre: "Celestron 21063 Astromaster 90 Az",
    precio: 1096038,
    img: "https://http2.mlstatic.com/D_NQ_NP_886295-MLU73416076486_122023-O.webp",
    stock: 8,
    categoria: "Telescopios",
  },
  {
    id: 3,
    nombre: "Motor Drive Para Telescopio 93514",
    img: "https://http2.mlstatic.com/D_NQ_NP_621824-MLU69630742324_052023-O.webp",
    precio: 172916,
    stock: 2,
    categoria: "Accesorios",
  },
  {
    id: 4,
    nombre: "Celestron 127eq Powerseeker Msi",
    img: "https://http2.mlstatic.com/D_NQ_NP_924755-MLU74727191598_032024-O.webp",
    precio: 879336,
    stock: 5,
    categoria: "Telescopios",
  },
  {
    id: 5,
    nombre: "Celestron Maksutov Computarizado Nexstar",
    img: "https://http2.mlstatic.com/D_NQ_NP_968660-MLA32317206408_092019-O.webp",
    precio: 2791274,
    stock: 8,
    categoria: "Telescopios",
  },
];
const usuarios = [
  { id: "1", nombre: "Ulises", password: "123456" },
  { id: "2", nombre: "Lucas", password: "654321" },
];
let carrito = [];

const productosFiltrados = productos.filter((el) => el.categoria === "calzado");

// console.log(productosFiltrados);

const productosContainer = productos
  .map((prod) => {
    return `
    <div class="producto">
        <h3>${prod.nombre}</h3>
        <img src=${prod.img}>
        <p>$ ${prod.precio}</p>
        <p>${prod.categoria}</p>
        <button class="btn-comprar" id=${prod.id}>Comprar</button>
    </div>
    `;
  })
  .join("");
let totalCarrito = 0;
let cantItems = 0;
const totalContainer = document.getElementById("total");
const container = document.getElementById("container");
container.innerHTML = productosContainer;
const mostTotal = (arr) => {
  totalContainer.innerHTML = `🛒${arr.length} Total de tu compra : ${totalCarrito}`;
};
mostTotal(carrito);
const botonesComprar = document.querySelectorAll(".btn-comprar");
const cant = 1;

const AgregarAlCarrito = (id) => {
  let prodComprado = productos.find((prod) => prod.id === id);
  if (carrito.some((el) => el.id === id)) {
    prodComprado.cantidad += cant;
  } else {
    prodComprado.cantidad = 1;
    carrito.push(prodComprado);
  }
  mostrarCarrito();
  addEventos();
  totalCarrito = calcularTotal(carrito);

  totalContainer.innerHTML = `🛒${cantidadItems(
    carrito
  )} Total de tu compra : ${totalCarrito}`;
};
const cantidadItems = (arr) => {
  let items = 0;
  arr.map((e) => (items += e.cantidad));
  return items;
};
botonesComprar.forEach((boton) => {
  boton.addEventListener("click", () => {
    AgregarAlCarrito(parseInt(boton.id));
  });
});
const borrarProd = (id) => {
  const index = carrito.findIndex((e) => e.id === id);
  if (index !== -1) {
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad -= 1;
    } else {
      const newArr = carrito.filter((e) => e.id !== id);
      carrito = newArr;
    }
    carritoContainer.innerHTML = "";
    mostrarCarrito();
    mostTotal(carrito);
    addEventos();
    totalCarrito = calcularTotal(carrito);
    totalContainer.innerHTML = `🛒${cantidadItems(
      carrito
    )} Total de tu compra : ${totalCarrito}`;
  }
};
const addEventos = () => {
  const botonesBorrar = document.querySelectorAll(".btn-borrar");
  botonesBorrar.forEach((btn) => {
    btn.addEventListener("click", () => {
      borrarProd(parseInt(btn.id), carrito);
    });
  });
};
const mostrarCarrito = () => {
  carritoContainer.innerHTML = "";
  const cart = carrito
    .map((prod) => {
      return `
    <div class="carrito">
        <h3>${prod.nombre} X${prod.cantidad}</h3>
        <button class="btn-borrar" id=${prod.id}>Borrar</button>
    </div>
    `;
    })
    .join("");
  carritoContainer.innerHTML = cart;
};
const calcularTotal = (arr) => {
  let total = 0;
  for (const prod of arr) {
    total += prod.precio * prod.cantidad;
  }
  return total;
};

const carritoContainer = document.getElementById("carrito");
