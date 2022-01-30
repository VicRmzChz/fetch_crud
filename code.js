/**
 * Created by Vic on 1/6/22.
 */
'use strict';

// Variables
const url = 'http://localhost:3000/api/articulos/';
const contenedor = document.querySelector('tbody');
let resultados = '';

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'));
const formArticulo = document.querySelector('form');
const descripcionEl = document.getElementById('descripcion-el');
const precioEl = document.getElementById('precio-el');
const stockEl = document.getElementById('stock-el');
const btnrCrearEl = document.getElementById('btnCrear-el');

let opcion = '';

btnrCrearEl.addEventListener('click', function () {
    descripcionEl.value = '';
    precioEl.value = '';
    stockEl.value = '';
    modalArticulo.show();
    opcion = 'crear';
});

const mostrar = (articulos) => {
    articulos.forEach(articulo =>{
        resultados +=  `<tr>
                <td>${articulo.id}</td>
                <td>${articulo.descripcion}</td>
                <td>${articulo.precio}</td>
                <td>${articulo.stock}</td>
                <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
            </tr>`
    })
    contenedor.innerHTML = resultados;
};

fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data))
    .then( error => console.log(error));


const on = (Element, event, selector, handler) => {
    Element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    })
}

// Delete proceses
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode;
    const id = fila.firstElementChild.innerHTML;

    alertify.confirm("This is a confirm dialog.",
  function(){
    fetch(url+id, {
        method: 'DELETE'
    })
    .then( res => res.json() )
    .then( ()=> location.reload());
    //alertify.success('Ok');
  },
  function(){
    alertify.error('Cancel');
  })
});

// Delete proceses
let idForm = 0;
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode;
    idForm = fila.children[0].innerHTML;
    const descripcionForm = fila.children[1].innerHTML;
    const precioForm = fila.children[2].innerHTML;
    const stockForm = fila.children[3].innerHTML;
    descripcionEl.value = descripcionForm;
    precioEl.value = precioForm;
    stockEl.value = stockForm;
    opcion = 'editar';
    modalArticulo.show();
    
});

//Procedimiento para Crear y editar
formArticulo.addEventListener('submit', (e)=>{
    e.preventDefault();
    if (opcion == 'crear') {
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                descripcion:descripcionEl.value,
                precio:precioEl.value,
                stock:stockEl.value
            })
        })
        .then( response => response.json() )
        .then (data => {
            const nuevoArticulo = [];
            nuevoArticulo.push(data);
            mostrar(nuevoArticulo);
        });
        console.log(descripcionEl.value);
    }
    if (opcion == 'editar'){
        //console.log('OPCION EDITAR');
        fetch(url+idForm, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                descripcion:descripcionEl.value,
                precio:precioEl.value,
                stock:stockEl.value
            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }

    modalArticulo.hide();
});