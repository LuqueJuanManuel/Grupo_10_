window.addEventListener("load", () =>{

    const qs = (selector) => {
        return document.querySelector(selector);

    }

 let $menu  = qs('div#menu');
 let $desplegable   = qs('nav.close');
 let $oscurecer = qs('.oscurecer');
 

    $menu.addEventListener('click', function (e) {
        /*Abrir $menu*/
        console.log("hola");
        $desplegable.classList.toggle('open');
        /* Oscurecer contenido al abrir el $menu */
        $oscurecer.style.display = 'block';

        /*Evitar que se haga scroll*/
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
        e.stopPropagation();
    });

    $oscurecer.addEventListener('click', function () {
        /* Cerrar $menu */
        
        $desplegable.classList.remove('open');

        /* Aclarar contenido al cerrar el $menu */
        $oscurecer.style.display = 'none';
        
        /*Activar scroll*/
        document.getElementsByTagName("html")[0].style.overflow = "auto";
    }); 
})