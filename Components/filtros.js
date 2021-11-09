$(document).ready(function () {
	//Agrego la clase 'active' al item que esta activo
	$('.categoriaItem[category="todo"]').addClass('active');

	//Creo el evento de click para cuando se seleccione una categoria
	$('.categoriaItem').click(function (e) {
		e.preventDefault();
		//Con esta variable los llamo por la categoria
		const categoriaProducto = $(this).attr('category');
		//Con esta funcion voy cambiando la clase active entre los seleccionados
		$('.categoriaItem').removeClass('active');
		$(this).addClass('active');

		//Oculto los productos que no tienen la misma categoria
		$('.card').css('transform', 'scale(0)');
		function ocultarProductos() {
			$('.card').hide();
		}
		setTimeout(ocultarProductos, 400);
		//Los vuelvo a mostrar
		function mostrarProductos() {
			$(`.card[category="${categoriaProducto}"]`).show();
			$(`.card[category="${categoriaProducto}"]`).css('transform', 'scale(1)');
		}
		setTimeout(mostrarProductos, 400);

		//Evento para mostrar todos los productos
		$('.categoriaItem[category="todo"]').click(function () {
			function mostrarTodos() {
				$('.card').show();
				$('.card').css('transform', 'scale(1)');
			}
			setTimeout(mostrarTodos, 400);
		});
	});
});
