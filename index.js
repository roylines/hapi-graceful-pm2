exports.register = function(server, options, done) {
  process.on('message', function(msg) {
    if (msg === 'shutdown') {
      server.log(['info', 'pm2', 'shutdown'], 'stopping hapi...');
      server.root.stop(options, function() {
        server.log(['info', 'pm2', 'shutdown'], 'hapi stopped');
        return process.exit(0);
      });
    }
  });

  return done();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
