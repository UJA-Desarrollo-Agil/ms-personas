/**
 * Fichero con la especificación de las pruebas TDD para callback.js
 * Este fichero DEBE llamarse callback-spec.js
 * Este fichero DEBE ubicarse en el subdirectorio spec/
 */


const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

describe('SERVER', () => {
  describe('REST API v1', () => {
    it('Devuelve Personas Home Page', (done) => {
      supertest(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /html/)
        .expect(function (res) {
          // console.log( res.text ); // Para comprobar qué contiene exactamente res.text
          assert(res.text === "Microservicio Personas: home page")
        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve Personas About PAGE', (done) => {
      supertest(app)
        .get('/about')
        .expect(200)
        .expect('Content-Type', /html/)
        .expect(function (res) {
          // console.log( res.text ); // Para comprobar qué contiene exactamente res.text
          assert(res.text === "Microservicio Personas: about page")
        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })
});
