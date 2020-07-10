const cursos = document.getElementById('lista-cursos');
const carrito = document.getElementById('lista-carrito');
const listaImprimir = carrito.querySelector('tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito')) || [] ;

anadirEventListenerCursos();



function anadirEventListenerCursos (){
    cursos.addEventListener('click', comprarCursos);
    carrito.addEventListener('click', borrarCursos);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', cargarLocalStorage);
}

function comprarCursos (e){
    e.preventDefault();
    
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        construirDatosCurso(curso);
    }
}

function construirDatosCurso(curso){

    const cursoSeleccionado = {
       // imagen: curso.querySelector('img').src,
        imagen: curso.querySelector('.imagen-curso').src,
        titulo: curso.querySelector('h4').textContent, 
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    anadirCarrito(cursoSeleccionado);
}

function anadirCarrito (cursoSeleccionado){

    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>
            <img src="${cursoSeleccionado.imagen}" width=100>
        </td>
        <td>
            ${cursoSeleccionado.titulo}
        </td>
        <td>
            ${cursoSeleccionado.precio}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${cursoSeleccionado.id}"> x</a>
        </td>
    `;
    listaImprimir.appendChild(fila);
    guardarCursoLocalStorage(cursoSeleccionado);

}

function borrarCursos (e){
    e.preventDefault();
    let cursoBorrar;
    let cursoId;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        cursoBorrar = e.target.parentElement.parentElement;
        cursoId = cursoBorrar.querySelector('a').getAttribute('data-id');
    }
    borrarCursosLocalStorage(cursoId);

}

function vaciarCarrito (e){
    e.preventDefault();
  
    while(listaImprimir.firstChild){
        listaImprimir.removeChild(listaImprimir.firstChild);
    }

    vacialLocalStorage();
    return false;
    
}
   
function guardarCursoLocalStorage(curso){

    carritoLocalStorage.push(curso);
    localStorage.setItem('carrito', JSON.stringify(carritoLocalStorage));

}

function cargarLocalStorage(){

    carritoLocalStorage.forEach(function(curso){

    const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>
                <img src="${curso.imagen}" width=100>
            </td>
            <td>
                ${curso.titulo}
            </td>
            <td>
                ${curso.precio}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}"> x</a>
            </td>
        `;
        listaImprimir.appendChild(fila);
    })
}

function borrarCursosLocalStorage(cursoId){

    carritoLocalStorage.forEach(function(curso, index){
        if(curso.id == cursoId){
            carritoLocalStorage.splice(index, 1);
        }
    });
    localStorage.setItem('carrito', JSON.stringify(carritoLocalStorage));
}

function vacialLocalStorage(){
    localStorage.clear();
}