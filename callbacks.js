/**
 * @file callbacks.js - callbacks para ms personas
 * @description Los callbacks son las funciones que se llaman cada vez que se recibe una petición a través de la API.
 *               Las peticiones se reciben en las rutas definidas en routes.js, pero se procesan aquí.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */



// Necesario para conectar a la BBDD faunadb
const faunadb = require('faunadb'),
    q = faunadb.query;

const client = new faunadb.Client({
    secret: 'fnAE6dR1GVAA1qiaRxaSZtbA7yGo6OpT2cB5NQnb',
});

const COLLECTION = "Personas"

// CALLBACKS DEL MODELO

/**
 * Función que permite servir llamadas sin importar el origen:
 * CORS significa Cross-Origin Resource Sharing
 * Dado un objeto de tipo respuesta, le añade las cabeceras necesarias para realizar CROS
 * @param {*} res Objeto de tipo response 
 * @returns Devuelve el mismo objeto para concatenar varias llamadas al mismo
 */
function CORS(res) {
    res.header('Access-Control-Allow-Origin', '*')
        .header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
    return res;
}


/**
 * Objeto que contiene las funciones callback para interactuar con el modelo (e.d., la BBDD)
 */
const CB_MODEL_SELECTS = {
    /**
     * Prueba de conexión a la BBDD: devuelve todas las personas que haya en la BBDD.
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    test_db: async (req, res) => {
        try {
            let personas = await client.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection(COLLECTION))),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )
            res.status(200).json(personas)
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },

    /**
     * Método para obtener todas las personas de la BBDD.
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    getTodas: async (req, res) => {
        try {
            let personas = await client.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection(COLLECTION))),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )
            // console.log( personas ) // Para comprobar qué se ha devuelto en personas
            CORS(res)
                .status(200)
                .json(personas)
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },

    /**
    * Método para obtener una persona de la BBDD a partir de su ID
    * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
    * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
    */
    getPorId: async (req, res) => {
        try {
            // console.log( "getPorId req", req.params.idPersona ) // req.params contiene todos los parámetros de la llamada
            let persona = await client.query(
                q.Get(q.Ref(q.Collection('Personas'), req.params.idPersona))
            )
            // console.log( persona ) // Para comprobar qué se ha devuelto en persona
            CORS(res)
                .status(200)
                .json(persona)
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },

    /**
    * Método para ocambiar el email de una persona
    * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
    * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
    */
    postEmail: async (req, res) => {
        // console.log("postEmail req.body", req.body) // req.body contiene todos los parámetros de la llamada

        try {
            let valorDevuelto={}
            let persona = await client.query(
                q.Update(
                    q.Ref(q.Collection(COLLECTION), req.body.id),
                    {
                        data: {
                            email: req.body.email
                        },
                    },
                )
            )
                .then((ret) => valorDevuelto = ret)

            //console.log("UPDATE DEVUELVE: ", valorDevuelto) // Para comprobar qué se ha devuelto en persona
            CORS(res)
                .status(200)
                .json(valorDevuelto)
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },
}



// CALLBACKS ADICIONALES

/**
 * Callbacks adicionales. Fundamentalmente para comprobar que el ms funciona.
 */
const CB_OTHERS = {
    /**
     * Devuelve un mensaje indicando que se ha accedido a la home del microservicio
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    home: async (req, res) => {
        try {
            res.status(200).json({ mensaje: "Microservicio Personas: home" });
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },

    /**
     * Devuelve un mensaje indicando que se ha accedido a la información Acerca De del microservicio
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    acercaDe: async (req, res) => {
        try {
            res.status(200).json({
                mensaje: "Microservicio Personas: acerca de",
                autor: "Víctor Manuel Rivas Santos",
                email: "vrivas@ujaen.es",
                fecha: "febrero, 2023"
            });
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },

}

// Une todos los callbacks en un solo objeto para poder exportarlos.
// MUY IMPORTANTE: No debe haber callbacks con el mismo nombre en los distintos objetos, porque si no
//                 el último que haya SOBREESCRIBE a todos los anteriores.
exports.callbacks = { ...CB_MODEL_SELECTS, ...CB_OTHERS }
