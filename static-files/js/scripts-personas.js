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


function imprimePersonas( vector ) {
    const div=document.getElementById( DIV_LISTADO );
    console.log( vector )
    for( let i=0; i<vector.length; ++i ) {
        div.innerHTML+=`
            <div>
            <p><b>Nombre</b>: ${vector[i].nombre}</p>
            <p><b>Apelidos</b>: ${vector[i].apellidos}</p>
            <p><b>E-mail</b>: ${vector[i].email}</p>
            <p><b>En plantilla desde</b>: ${vector[i].anio_entrada}</p>
                `;
    }
}
function main() {
    recuperaPersonas(imprimePersonas);
}