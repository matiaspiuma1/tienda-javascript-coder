//Creo la misma funcion que hice para los productos pero para la alerta del envio del formulario
const btnEnviarFormulario = document.querySelector('.botonContacto');
const enviarAlertaForm = (e) => {
    e.preventDefault();
    const alert = document.querySelector('.alert');
    setTimeout(function () {
        alert.classList.add('hide');
    }, 1000);
    alert.classList.remove('hide');

    //Agarro el formulario para resetearlo y que quede vacio
    const formulario = document.querySelector('form');
    formulario.reset();
}
btnEnviarFormulario.addEventListener('click', enviarAlertaForm);

