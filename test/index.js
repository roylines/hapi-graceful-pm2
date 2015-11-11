// jshint esnext:true,node:true
"use strict";

const Lab = require("lab");
const lab = exports.lab = Lab.script();
const plugin = require('../index.js');
const should = require('chai').should();

lab.experiment("hapi-graceful-pm2", () => {
  lab.test("should have correct attributes", (done) => {
    let pkg = require('../package.json');
    plugin.register.attributes.pkg.should.deep.equal(pkg);
    return done();
  });
});
