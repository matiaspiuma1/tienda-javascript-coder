//Importo los productos desde otro archivo
import { PRODUCTOS } from './data/productos.js';

//Con un forEach los empiezo a seleccionar para que cada productos se pinte y con jQuery selecciono donde y de que forma quiero que se muestren
PRODUCTOS.forEach((producto) => {
	$('.productos').append(`
                            <div id="card" class="card col-12 col-md-6 col-lg-11 mb-5" category="${producto.tipo}">
                                <img src="imagenes/${producto.id}.png" class="card-img-top img-fluid imagenesProductos mx-auto d-block" alt="${producto.producto}">
                                    <div class="card-body">
                                        <p class="card-title">${producto.tipo} ${producto.producto}</p>
                                        <p class="card-text">$${producto.precio}</p>
                                        <button id="agregarCarrito" class="btn btn-primary btnCompra">Comprar</button>
                                    </div>
                            </div>`);
});

//Empiezo a crear los eventos seleccionando primero todos los botones de agregar al carrito
const btnCompra = document.querySelectorAll('.btnCompra');

//Vuelvo a utilizar un forEach para que cada boton tenga un evento tipo 'Click' y que tenga una funcion callback
btnCompra.forEach((agregarBotonCompra) => {
	agregarBotonCompra.addEventListener('click', agregarAlCarrito);
});

//Esta funcion primero contiene el target del evento que hace que agarre primero al BOTON y despues capturo al elemento mas cercano con el id="card", por lo tanto agarra toda la informacion del producto
function agregarAlCarrito(e) {
	const boton = e.target;
	const card = boton.closest('#card');

	//De aca agarro solo el titulo del producto
	const tituloItem = card.querySelector('.card-title').textContent;
	//El precio
	const precioItem = card.querySelector('.card-text').textContent;
	//Imagen del producto
	const imagenItem = card.querySelector('img').src;

	agregarItemAlCarrito(tituloItem, precioItem, imagenItem);
}



//Esta constante sirve para seleccionar donde van a ir los items en el carrito
const contenedorDeProductosElemento = document.querySelector('#contenedorCarrito');

//Esta funcion hace que se muestre el titulo, el precio y la imagen del producto seleccionado en la parte del carrito
function agregarItemAlCarrito(tituloItem, precioItem, imagenItem) {
	//Esta funcion sirve para desplegar una alerta cuando se agrega un producto al carrito
	const alert = document.querySelector('.alert');
	setTimeout(function () {
		alert.classList.add('hide');
	}, 1000);
	alert.classList.remove('hide');

	//Esta constante detecta a todos los productos cuando son agregados al carrito
	const titulosProductos = document.getElementsByClassName('nombreProducto');
	//Creo el bucle for para identificar cada producto mediante su nombre y esto hace que no se cree otro elemento, si no que se sumen
	for (let i = 0; i < titulosProductos.length; i++) {
		if (titulosProductos[i].textContent === tituloItem) {
			let cantidadProducto = titulosProductos[i].parentElement.parentElement.parentElement.querySelector('.inputCantidadItem');
			cantidadProducto.value++;
			actualizarTotalCarrito();
			return;
		}
	}

	//Aca esta la forma en la los productos se muestran en el carrito
	const contenedorProductos = document.createElement('div');
	const pintarProductoCarrito = `
			<div class="row itemProducto">
                <div class="col-6">
                    <div class="d-flex align-items-center h-100">
                        <img src=${imagenItem} class="imagenCanvas" alt="${tituloItem}">
                        <h6 class="nombreProducto">${tituloItem}</h6>
                    </div>
                </div>
                <div class="col-2">
                    <div class="d-flex align-items-center h-100">
                        <p class="precioItem">${precioItem}</p>
                    </div>
                </div>
                <div class="col-4">
                    <div class=" d-flex justify-content-between align-items-center h-100">
                        <input class="inputCantidadItem" id="prueba" type="number" value="1">
                        <button class="btn btn-danger borrarProducto" type="button">X</button>
                    </div>
                </div>
            </div> `;

	//Aca se muestran los productos en el carrito
	contenedorProductos.innerHTML = pintarProductoCarrito;
	contenedorDeProductosElemento.prepend(contenedorProductos);

	//Selecciono el boton de borrar producto y creo el evento
	contenedorProductos.querySelector('.borrarProducto').addEventListener('click', borrarProductoCarrito);

	//Selecciono el input para que el cliente elija la cantidad del producto
	contenedorProductos.querySelector('.inputCantidadItem').addEventListener('input', cantidadIngresada);

	//Funcion para actualizar el total del carrito
	actualizarTotalCarrito();
}


//Esta funcion es para que se muestre el precio total del carrito
function actualizarTotalCarrito() {
	//Creo un contador empezando en 0
	let total = 0;

	//Selecciono donde quiero que se muestre el precio total
	const cantidadTotalPrecio = document.querySelector('.precioTotal');
	const itemsEnCarrito = document.querySelectorAll('.itemProducto');

	//Con un forEach hago que por cada producto se sume la cantidad ingresada
	itemsEnCarrito.forEach((itemEnCarrito) => {
		const precioElemento = itemEnCarrito.querySelector('.precioItem');
		const precioSolo = Number(precioElemento.textContent.replace('$', ''));
		const inputCantidad = itemEnCarrito.querySelector('.inputCantidadItem');
		const cantidadSeleccionada = Number(inputCantidad.value);
		total = total + precioSolo * cantidadSeleccionada;
	});

	cantidadTotalPrecio.innerHTML = `Precio total: $${total.toFixed(3)} `;
}

//Funcion para borrar el producto del carrito y actualizar el precio
function borrarProductoCarrito(e) {
	//Capturo el evento del boton
	const botonClickeado = e.target;
	//Seleccion el producto y le doy la opcion para removerlo
	botonClickeado.closest('.itemProducto').remove();
	//Y actualizo el precio
	actualizarTotalCarrito();
}

//Funcion para que el producto siempre sea mas de uno y no se pueda bajar a 0
function cantidadIngresada(e) {
	//Capturo el evento del input
	const input = e.target;
	//El usuario de esta forma no puede bajar de 1 y el precio se actualiza cada vez que sube la cantidad
	if (input.value <= 0) {
		input.value = 1;
	}
	actualizarTotalCarrito();
}