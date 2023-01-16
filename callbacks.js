// callbacks.js - callbacks for microservicio-1.
// CALLBACKS DEL MODELO

// CALLBACKS ADICIONALES
const CB_OTHERS = {
home: async (req, res) => {
   try {
       res.status(200).send("Microservicio Personas: home page");
   } catch (error) {
       res.status(500).json({ error: error.description })
   }
},
about: async (req, res)=>{
   try {
       res.status(200).send("Microservicio Personas: about page");
   } catch (error) {
       res.status(500).json({ error: error.description })
   }
}
}

// Une todos los callbacks en un solo objeto.
// OJO: No debe haber callbacks con el mismo nombre en los distintos objetos, porque si no
// el último que haya sobreescribe a todos los anteriores.
exports.callbacks = {...CB_OTHERS}
