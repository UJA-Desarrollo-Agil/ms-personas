// callbacks.js - callbacks for microservicio-1.
// CALLBACKS DEL MODELO
// CALLBACKS DEL MODELO
const faunadb = require('faunadb'),
    q = faunadb.query;

const client = new faunadb.Client({
    secret: 'fnAE6dR1GVAA1qiaRxaSZtbA7yGo6OpT2cB5NQnb',
});


// Permitir CORS
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
const CB_OTHERS = {
    home: async (req, res) => {
        try {
            res.status(200).send("Microservicio Personas: home page");
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },
    acercaDe: async (req, res) => {
        try {
            res.status(200).send("Microservicio Personas: página Acerca De");
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    }

}

// Une todos los callbacks en un solo objeto.
// OJO: No debe haber callbacks con el mismo nombre en los distintos objetos, porque si no
// el último que haya sobreescribe a todos los anteriores.
exports.callbacks = { ...CB_MODEL_SELECTS, ...CB_OTHERS }
