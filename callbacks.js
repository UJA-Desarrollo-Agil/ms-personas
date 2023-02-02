// callbacks.js - callbacks para ms personas
// Los callbacks son las funciones que se llaman cada vez que se recibe una petición a través de la API.
// Las peticios se reciben en las rutas definidas en routes.js, pero se procesan aquí.



// Necesario para conectar a la BBDD faunadb
const faunadb = require('faunadb'),
    q = faunadb.query;

const client = new faunadb.Client({
    secret: 'fnAE6dR1GVAA1qiaRxaSZtbA7yGo6OpT2cB5NQnb',
});

// CALLBACKS DEL MODELO

// Función que permite servir llamadas sin importar el origen:
// CORS significa Cross-Origin Resource Sharing
// Dado un objeto de tipo respuesta, le añade las cabeceras necesarias para realizar CROS
// Devuelve el mismo objeto para concatenar llamadas al mismo
function CORS(res) {
    res.header('Access-Control-Allow-Origin', '*')
        .header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
    return res;
}


// CALLBACKS PARA SELECTS DEL MODELO
const CB_MODEL_SELECTS = {
    // Prueba de conexión a la BBDD
    test_db: async (req, res) => {
        try {
            let personas = await client.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection("Personas"))),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )
            res.status(200).json(personas)
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },

    // Devuelve todas las personas de la BBDD
    getTodas: async (req, res) => {
        try {
            let personas = await client.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection("Personas"))),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )
            // console.log( personas ) // Para comprobar qué se ha devuelto en personas
            //personas = personas.data.map(e => e.data)  // Elimina la info innecesaria
            CORS(res)
                .status(200)
                .json(personas)
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },
}



// CALLBACKS ADICIONALES

// Otros callbacks. Sirven para comprobar que el servidor funciona correctamente.
const CB_OTHERS = {
    home: async (req, res) => {
        try {
            res.status(200).json({mensaje: "Microservicio Personas: home"});
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },
    acercaDe: async (req, res) => {
        try {
            res.status(200).json({mensaje: "Microservicio Personas: acerca de"});
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },

}

// Une todos los callbacks en un solo objeto.
// OJO: No debe haber callbacks con el mismo nombre en los distintos objetos, porque si no
// el último que haya sobreescribe a todos los anteriores.
exports.callbacks = { ...CB_MODEL_SELECTS, ...CB_OTHERS }
