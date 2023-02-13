// Necesario para que el servidor acepte llamadas
const express = require("express")
const app = express()

// Necesario para poder obtener los datos en las llamadas POST
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Necesario para gestionar el conjunto de callbacks para las distintas funciones REST
const routes = require("./routes")
app.use("/", routes);




const port = 8002;
app.listen(port, () => {
    console.log(`Microservicio PERSONAS ejecutándose en puerto ${port}!`);
});


module.exports = app
