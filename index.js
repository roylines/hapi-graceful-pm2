const register = (server, options) => {
    process.on('SIGINT', () => {
        server.log(['info', 'pm2', 'shutdown'], 'stopping hapi...');

        server.stop(options).then(() => {
            server.log(['info', 'pm2', 'shutdown'], 'hapi stopped');
            return process.exit(0);
        });
    });
};

exports.plugin = {
    register,
    pkg: require('./package.json')
};
