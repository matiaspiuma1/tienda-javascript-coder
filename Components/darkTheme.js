//Llamo al boton del switch
const btnSwitch = document.querySelector('#modoOscuro');
//Le creo el evento para poner en modo oscuro o claro
btnSwitch.addEventListener('click', () => {
	//Cuando se presiona para el modo oscuro, al body se le agrega la clase 'dark', si no, se le quita
	document.body.classList.toggle('dark');
	btnSwitch.classList.toggle('active');

	//Guardo en el localStorage la opcion del usuario
	if (document.body.classList.contains('dark')) {
		localStorage.setItem('dark-mode', 'true');
	} else {
		localStorage.setItem('dark-mode', 'false');
	}
});

//Se guarda el valor en el que lo dejo el usuario
if (localStorage.getItem('dark-mode') === 'true') {
	document.body.classList.toggle('dark');
	btnSwitch.classList.add('active');
} else {
	document.body.classList.remove('dark');
	btnSwitch.classList.remove('active');
}
