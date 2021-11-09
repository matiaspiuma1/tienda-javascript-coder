//Creo el evento de click para cuando el cliente quiere terminar la compra
$('.finalizarCompraBtn').click(imprimirPasarelaPago);

//Esta funcion sirve para mostrar los inputs para completar y terminar la compra
function imprimirPasarelaPago() {
	//Oculto los productos para que se muestre los campos a completar
	$('#contenedorCarrito div').hide();
	//Tambien el boton de compra
	$('.finalizarCompraBtn').hide();
	$('#contenedorCarrito').append(`
                                    <div class="contenedorInputsPago">
                                        <div>
                                            <h2 class="tituloPago">Datos de Pago</h2>
                                        </div>
                                        <div>
                                            <input type="text" class="inputPago" placeholder="Nombre" />
                                        </div>
                                        <div>
                                            <input type="text" class="inputPago" placeholder="Apellido" />
                                        </div>
                                        <div>
                                            <input type="number" class="inputPago" required placeholder="Número de Tarjeta" />
                                        </div>
                                        <div>
                                            <input type="number" class="inputPago" placeholder="CVV" />
                                        </div>
                                        <div>
                                            <input type="month" class="inputPago" placeholder="Fecha de vencimiento"/>
                                        </div>
                                    <button type="button" class="btn btn-primary btnPago" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Pagar</button>
                                    </div>`);

	//Creo el evento para vaciar el carrito y que no quede ningun producto
	$('.btnPago').on('click', vaciarCarrito);
	function vaciarCarrito() {
		$('#contenedorCarrito').empty();
	}

	//Creo un evento tambien para despues refrescar la pagina y puedan volver a comprar
	$('.btnRefrescarPag').click(refrescarPag);
	function refrescarPag() {
		location.reload();
	}
}
