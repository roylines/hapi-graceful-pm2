exports.plugin = {
    register: function(server, options) {
        process.on('SIGINT', function () {
            server.log(['info', 'pm2', 'shutdown'], 'stopping hapi...');
            server.root.stop(options, function () {
                server.log(['info', 'pm2', 'shutdown'], 'hapi stopped');
                return process.exit(0);
            });
        });

    },
    pkg: require('./package.json')
};
