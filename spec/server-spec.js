/**
 * Fichero con la especificación de las pruebas TDD para callback.js
 * Este fichero DEBE llamarse callback-spec.js
 * Este fichero DEBE ubicarse en el subdirectorio spec/
 */


const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

describe('Servidor Personas:', () => {
  describe('Rutas / y /acercade', () => {
    it('Devuelve Personas Home Page', (done) => {
      supertest(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio Personas: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve Personas Acerca De', (done) => {
      supertest(app)
        .get('/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio Personas: acerca de");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })

  describe('Acceso a BBDD:', () => {
    it('Devuelve Ana al consultar mediante test_db', (done) => {
      supertest(app)
        .get('/test_db')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[0].data.hasOwnProperty('nombre'));
          assert(res.body.data[0].data.nombre === "Ana");

        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });


    it('Devuelve un vector de tamaño 3 al consultar mediante getTodas', (done) => {
      supertest(app)
        .get('/getTodas')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          // console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data.length === 3);
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });
  })
});
