// Necesario para que el servidor acepte llamadas
const express = require("express")

// Necesario para gestionar el conjunto de callbacks para las distintas funciones REST
const routes = require("./routes")

// Necesario para poder obtener los datos en las llamadas POST
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = 8002;
app.use("/", routes);
 


app.listen(port, () => {
    console.log(`Microservicio PERSONAS ejecutándose en puerto ${port}!`);
});


module.exports = app
