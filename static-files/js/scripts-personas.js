/**
 * Funciones en javascript para el cliente
 */
const DIV_LISTADO = "listado"

function recuperaPersonas(callBackFn) {
    let url = "/getPersonasAll"
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let vectorPersonas = JSON.parse(JSON.stringify(data))
            callBackFn(vectorPersonas)
            return
        })
        .catch(function (err) {
            // If an error occured, you will catch it here
            console.log("OJO Error: " + err)
        });
}

function creaHTMLUnaPersona( p ) {
    return `<div>
            <p><b>Nombre</b>: ${p.nombre}</p>
            <p><b>Apelidos</b>: ${p.apellidos}</p>
            <p><b>E-mail</b>: ${p.email}</p>
            <p><b>En plantilla desde</b>: ${p.anio_entrada}</p>
                `;
}

function imprimePersonas( vector ) {
    const div=document.getElementById( DIV_LISTADO );
    // console.log( vector ) Para comprobar lo que hay en vector
    vector.forEach( e=>div.innerHTML+=creaHTMLUnaPersona( e ))
}

function main() {
    recuperaPersonas(imprimePersonas);
}