const request = require('supertest');

const  app  =  require ('../app.js');

const testValues = [
    ['1', 'I'],
    ['2', 'II'],
    ['3', 'III'],
    ['4', 'IV'],
    ['5', 'V'],
    ['6', 'VI'],
    ['7', 'VII'],
    ['8', 'VIII'],
    ['9', 'IX'],
    ['10', 'X'],
    ['1492', 'MCDXCII'],
    ['1944', 'MCMXLIV'],
    ['2020', 'MMXX'],
    ['3999', 'MMMCMXCIX'],
  ];

// TEST GET

describe('GET /', () => {
    it('Respond with json containing a list of all users', (done) => {
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});


// TEST POST 

 describe('POST /', () => {

    it('Respond: Request not valid', (done) => {
        request(app)
          .post('/')
          .send({"text": ""})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done)
          .expect({
            'response_type': 'in_channel',
            'text': 'Request not valid'
        })
      });

      it('Respond: Unknown roman numeral', (done) => {
        request(app)
          .post('/')
          .send({"text": "abdd"})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done)
          .expect({
            'response_type': 'in_channel',
            'text': 'Unknown roman numeral'
        })
      });
    
    testValues.forEach(([expected, input]) => {
        it(`El numero ${expected} se traducirá en el número romano: ${input}`, (done) => {
            const data = {
                'text': ` ${expected} `
            };
            request(app)
              .post('/')
              .send(data)
              .set('Accept', 'application/json')
              .expect({
                'response_type': 'in_channel',
                'text': `${input}`
            })
              .expect(200)
              .end((err) => {
                if (err) return done(err);
                done();
              });
        });

      });

      testValues.forEach(([expected, input]) => {
        it(`El numero ${input} se traducirá en el número romano: ${expected}`, (done) => {
            const data = {
                'text': `${input}`
            };
            request(app)
              .post('/')
              .send(data)
              .set('Accept', 'application/json')
              .expect({
                'response_type': 'in_channel',
                'text': parseInt(expected)
            })
              .expect(200)
              .end((err) => {
                if (err) return done(err);
                done();
              });
        });
      }); 
      
      
})
