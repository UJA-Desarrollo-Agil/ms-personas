const express = require("express");
const routes = require("./routes");
const app = express();
const port = 8001;
app.use("/", routes);


app.listen(port, () => {
    console.log(`Microservicio PERSONAS ejecutándose en puerto ${port}!`);
});


module.exports = app
