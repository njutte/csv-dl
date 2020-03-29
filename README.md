# express-json2csv-middleware
A middleware for responding to express routes with csv data parsed using json2csv parsers

#Installation

``` npm install https://github.com/njutte/express-json2csv-middleware ```

#Usage

The package export a middleware builder that accepts an optional argument of a json2csv parser. The builder returns a middleware that will parse data in response.state.data into csv format and return it as a file name data.csv

See [demo app](./test/integration/app.js) for an implementation example.


