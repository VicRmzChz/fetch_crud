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
    stock.value = '';
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

on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode;
    const id = fila.firstElementChild.innerHTML;
});