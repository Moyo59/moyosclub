document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
})

function eventListeners (){
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenu.addEventListener('click', navegacionResponsive)
}

function navegacionResponsive (){
    const navegacion = document.querySelector('.navegacion');
    // desaparecer y agregar una clase menu hamburguesa con if
    // if(navegacion.classList.contains('mostrar')) {
    //     navegacion.classList.remove('mostrar');
    // } else {
    //     navegacion.classList.add('mostrar');
    // }


    // desaparecer y agregar una clase menu hamburguesa con toggle
    navegacion.classList.toggle('mostrar')
}