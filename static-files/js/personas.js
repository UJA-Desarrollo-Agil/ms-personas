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

// Mostrar como DIV
//const FN_CABECERA="personasCabeceraDIV"
//const FN_PERSONA="personaDIV"
//const FN_PIE="personasPieDIV"

// Mostrar como TABLA
const FN_CABECERA="personasCabeceraTABLE"
const FN_PERSONA="personaTR"
const FN_PIE="personasPieTABLE"

// Funciones para mostrar como DIV
function personasCabeceraDIV() {
    return "<div>";
}

function personaDIV( p ) {
    return `<div>
    <p><b>Nombre</b>: ${p.nombre}</p>
    <p><b>Apelidos</b>: ${p.apellidos}</p>
    <p><b>E-mail</b>: ${p.email}</p>
    <p><b>En plantilla desde</b>: ${p.anio_entrada}</p>
    </div>
    `;
}
function personasPieDIV() {
    return "</div>";
}

// Funciones para mostrar como TABLE
function personasCabeceraTABLE() {
    return `<table class="listado-personas">
        <thead>
        <th>Nombre</th><th>Apellidos</th><th>eMail</th><th>Año contratación</th>
        </thead>
        <tbody>
    `;
}
function personaTR( p ) {
    return `<tr>
    <td>${p.nombre}</td>
    <td>${p.apellidos}</td>
    <td>${p.email}</td>
    <td>${p.anio_entrada}</td>
    </tr>
    `;
}
function personasPieTABLE() {
    return "</tbody></table>";
}



// Funciónq ue muestra todo el listado de personas en pantalla
function imprimePersonas(vector) {
    const div = document.getElementById(DIV_LISTADO);
    // console.log( vector ) Para comprobar lo que hay en vector
    let msj="";
    msj+= eval(FN_CABECERA)();
    vector.forEach(e => msj += eval(FN_PERSONA)(e))
    msj += eval(FN_PIE)();
    div.innerHTML=msj;
}


// Función inicial para la página de listar
function main_listar() {
    recuperaPersonas(imprimePersonas);
    return true;
}
