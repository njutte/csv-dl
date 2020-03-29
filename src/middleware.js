const { Parser } = require('json2csv');

/** Build a middleware with a json2csv parser
 *  @param {JSON2CSVParser} parser A json2csv parse to use on body data passed to middleware
 *  @return {Function} A middleware function for responding with csv data
 */

const middlewareBuilder = (parser = new Parser()) => {
  if (!(parser instanceof Parser)) throw new Error('parser must be a JSON2CSVParser');

  return (request, response, next) => {
    const { data } = response.state;
    try {
      const csv = parser.parse(data);
      response.attachment('data.csv');
      response.send(csv);
    } catch (error) {
      return next(error);
    }
    return next();
  };
};

module.exports = middlewareBuilder;
