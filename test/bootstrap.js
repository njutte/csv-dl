const chai = require('chai');
const chaiSinon = require('sinon-chai');

chai.use(chaiSinon);

global.expect = chai.expect;
