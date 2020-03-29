const express = require('express');
const { Parser } = require('json2csv');


const json2csvMiddlewareBuider = require('../../index');


const demo = (request, response, next) => {
  const html = `
    <ul>
    <li><a href="./default"> default</a></li>
    <li><a href="./with-parser"> with-parser</a></li>
    </ul>
    `;
  response.send(html);
  next();
};

const loadData = (request, response, next) => {
  request.state = {
    body: [
      { name: 'a', value: 1 },
      { name: 'b', value: 2 },
      { name: 'c', value: 3 },
    ],
  };
  next();
};
const app = express();
app.get('/', demo);
app.get('/default', loadData, json2csvMiddlewareBuider());
app.get('/with-parser', loadData, json2csvMiddlewareBuider(new Parser()));

module.exports = app;
