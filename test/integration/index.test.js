const request = require('supertest');

const app = require('./app');

describe('demo page', function () {
  it('returns an html page', function () {
    return request(app)
      .get('')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200);
  });
});

const expectedData = [
  '"name","value"',
  '"a",1',
  '"b",2',
  '"c",3',
].join('\n');

describe('default parser middleware route', function () {
  it('returns an html page', function () {
    return request(app)
      .get('/default')
      .expect('Content-Type', 'text/csv; charset=utf-8')
      .expect(200)
      .then((response) => expect(response.text).to.eql(expectedData));
  });
});

describe('default with-parser middleware route', function () {
  it('returns an html page', function () {
    return request(app)
      .get('/with-parser')
      .expect('Content-Type', 'text/csv; charset=utf-8')
      .expect(200)
      .then((response) => expect(response.text).to.eql(expectedData));
  });
});
