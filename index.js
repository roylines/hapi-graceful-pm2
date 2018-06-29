const register = (server, options) => {
  process.on('SIGINT', async () => {
    server.log(['info', 'pm2', 'shutdown'], 'stopping hapi...');
    await server.stop(options);
    server.log(['info', 'pm2', 'shutdown'], 'hapi stopped');

    return process.exit(0);
  });
};

exports.default = {
  register,
  pkg: require('./package.json')
};
