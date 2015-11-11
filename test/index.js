// jshint esnext:true,node:true
"use strict";

const Lab = require("lab");
const lab = exports.lab = Lab.script();
const plugin = require('../index.js');
const should = require('chai').should();
const sinon = require('sinon');

lab.experiment("hapi-graceful-pm2", () => {
  let server = {};

  let options = {};

  lab.beforeEach((done) => {
    sinon.stub(process, 'on').returns();
    sinon.stub(process, 'exit');
    server.root = {};
    server.root.stop = sinon.stub();
    server.log = sinon.stub();

    return plugin.register(server, options, done);
  });

  lab.afterEach((done) => {
    process.on.restore();
    process.exit.restore();
    return done();
  });

  lab.test("should have correct attributes", (done) => {
    let pkg = require('../package.json');
    plugin.register.attributes.pkg.should.deep.equal(pkg);
    return done();
  });

  lab.test("should bind to correct process method", (done) => {
    process.on.args[0][0].should.equal('message');
    return done();
  });

  lab.test("should stop server if shutdown", (done) => {
    server.log.returns();
    server.root.stop.yields();
    process.exit.restore();
    sinon.stub(process, 'exit', function(code) {
      code.should.equal(0);
      server.root.stop.calledOnce.should.be.true;
      return done();
    });
    
    let method = process.on.args[0][1];
    method('shutdown');
  });

  lab.test("should not stop server if any other message", (done) => {
    let method = process.on.args[0][1];
    method('any other message');
    return done();
  });

});
