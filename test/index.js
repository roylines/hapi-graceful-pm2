// jshint esnext:true,node:true
"use strict";

const Lab = require("lab");
const lab = exports.lab = Lab.script();
const plugin = require('../index.js').plugin;
const should = require('chai').should();
const sinon = require('sinon');

lab.experiment("hapi-graceful-pm2", () => {
  let server = {};

  let options = {};

  lab.beforeEach(() => {
    sinon.stub(process, 'on').returns();
    sinon.stub(process, 'exit');
    server = {
      stop: sinon.stub()
    };
    server.log = sinon.stub();

    return plugin.register(server, options);
  });

  lab.afterEach(() => {
    process.on.restore();
    process.exit.restore();
  });

  lab.test("should have correct attributes", () => {
    let pkg = require('../package.json');
    plugin.pkg.should.deep.equal(pkg);
  });

  lab.test("should bind to correct process method", () => {
    process.on.args[0][0].should.equal('SIGINT');
  });

  lab.test("should stop server if shutdown", () => {
    server.log.returns();
    server.stop.yields();
    process.exit.restore();
    sinon.stub(process, 'exit').callsFake((code) => {
        code.should.equal(0);
        server.stop.calledOnce.should.be.true;
    });

    let method = process.on.args[0][1];
    method('shutdown');
  });

  lab.test("should not stop server if any other message", () => {
    let method = process.on.args[0][1];
    method('any other message');
  });

});
