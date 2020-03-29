const { Parser } = require('json2csv');
const sinon = require('sinon');

const middlewareBuilder = require('../../../src/middleware');

describe('middlewareBuilder', function () {
  context('when a parser is not supplied', function () {
    it('returns a function when called', function () {
      expect(middlewareBuilder()).to.be.a('function');
    });

    describe('middleware function', function () {
      context('when state.body is parseable', function () {
        before(function () {
          this.next = sinon.spy();
          this.response = {
            attachment: sinon.spy(),
            send: sinon.spy(),
          };
          this.request = {
            state: {
              body: [
                { name: 'a', value: 1 },
                { name: 'b', value: 2 },
                { name: 'c', value: 3 },
              ],
            },
          };
          const middleware = middlewareBuilder();
          middleware(this.request, this.response, this.next);
        });

        it('calls next once', function () {
          expect(this.next).calledOnceWithExactly();
        });

        it('calls response attachment once with file name', function () {
          expect(this.response.attachment).calledOnceWithExactly('data.csv');
        });

        it('calls response send once with csv data name', function () {
          const expectedData = [
            '"name","value"',
            '"a",1',
            '"b",2',
            '"c",3',
          ].join('\n');
          expect(this.response.send).calledOnceWithExactly(expectedData);
        });
      });

      context('when state.body is missing', function () {
        before(function () {
          this.next = sinon.spy();
          this.response = {
            attachment: sinon.spy(),
            send: sinon.spy(),
          };
          this.request = {
            state: {},
          };
          const middleware = middlewareBuilder();
          middleware(this.request, this.response, this.next);
        });

        it('calls next once with an error', function () {
          expect(this.next).calledOnce.and.calledWithMatch(sinon.match.instanceOf(Error));
        });

        it('calls response attachment is not called', function () {
          return expect(this.response.attachment).to.not.be.called;
        });

        it('calls response send is not called', function () {
          return expect(this.response.send).to.not.be.called;
        });
      });
    });
  });

  context('when a parser is supplied', function () {
    it('returns a function when called', function () {
      const parser = new Parser();
      expect(middlewareBuilder(parser)).to.be.a('function');
    });

    describe('middleware function', function () {
      context('when stae.body is parseable', function () {
        before(function () {
          const parser = new Parser();
          this.parseSpy = sinon.spy(parser, 'parse');
          this.next = sinon.spy();
          this.response = {
            attachment: sinon.spy(),
            send: sinon.spy(),
          };
          this.request = {
            state: {
              body: [
                { name: 'a', value: 1 },
                { name: 'b', value: 2 },
                { name: 'c', value: 3 },
              ],
            },
          };
          const middleware = middlewareBuilder(parser);
          middleware(this.request, this.response, this.next);
        });

        it('calls parse on the supplied parser with data', function () {
          const {
            request: {
              state: {
                body,
              },
            },
            parseSpy,
          } = this;

          expect(expect(parseSpy).calledOnceWithExactly(body));
        });

        it('calls next once', function () {
          expect(this.next).calledOnceWithExactly();
        });

        it('calls response attachment once with file name', function () {
          expect(this.response.attachment).calledOnceWithExactly('data.csv');
        });

        it('calls response send once with csv data name', function () {
          const expectedData = [
            '"name","value"',
            '"a",1',
            '"b",2',
            '"c",3',
          ].join('\n');
          expect(this.response.send).calledOnceWithExactly(expectedData);
        });
      });

      context('when state.body is missing', function () {
        before(function () {
          const parser = new Parser();
          this.parseSpy = sinon.spy(parser, 'parse');
          this.next = sinon.spy();
          this.response = {
            attachment: sinon.spy(),
            send: sinon.spy(),
          };
          this.request = {
            state: {},
          };
          const middleware = middlewareBuilder(parser);
          middleware(this.request, this.response, this.next);
        });

        it('calls parse on the supplied parser with data', function () {
          const {
            parseSpy,
          } = this;

          expect(expect(parseSpy).calledOnceWithExactly(undefined));
        });

        it('calls next once with an error', function () {
          expect(this.next).calledOnce.and.calledWithMatch(sinon.match.instanceOf(Error));
        });

        it('calls response attachment is not called', function () {
          return expect(this.response.attachment).to.not.be.called;
        });

        it('calls response send is not called', function () {
          return expect(this.response.send).to.not.be.called;
        });
      });
    });
  });
});
