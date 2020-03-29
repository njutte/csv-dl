describe('index.js', function () {
  it('exports a function', function () {
    // eslint-disable-next-line global-require
    const testObject = require('../../index.js');
    expect(testObject).to.be.a('function');
  });
});
