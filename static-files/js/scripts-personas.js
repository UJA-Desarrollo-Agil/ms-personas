/**
 * Funciones en javascript para el cliente
 */
const SERVER = "http://localhost"
const PORT = "8001"

const DIV_LISTADO = "listado"

async function recuperaPersonas(callBackFn) {
    const url = SERVER + ":" + PORT + "/getPersonasAll"
    const response = await fetch(url);
    const vectorPersonas = await response.json()
    callBackFn(vectorPersonas)
}


function creaHTMLUnaPersona(p) {
    return `<div>
            <p><b>Nombre</b>: ${p.nombre}</p>
            <p><b>Apelidos</b>: ${p.apellidos}</p>
            <p><b>E-mail</b>: ${p.email}</p>
            <p><b>En plantilla desde</b>: ${p.anio_entrada}</p>
                `;
}

function imprimePersonas(vector) {
    const div = document.getElementById(DIV_LISTADO);
    // console.log( vector ) Para comprobar lo que hay en vector
    vector.forEach(e => div.innerHTML += creaHTMLUnaPersona(e))
}

function main() {
    recuperaPersonas(imprimePersonas);
}