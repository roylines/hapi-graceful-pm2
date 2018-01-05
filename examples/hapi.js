const Hapi = require('hapi');

const server = new Hapi.Server({ port: 3000 });

const initialize = async (server) => {
    await server.register({
        plugin: require('../index.js'),
        options: {
            timeout: 4000
        }
    });

    server.route({
      method: 'GET',
      path: '/',
      handler(request, h) {
          return 'Hello, world!';
      }
    });

    await server.start();

    return server;
}

initialize(server).then(server => {
console.log(`Server started at ${server.info.uri}`);
}).catch(err => {
throw err;
})
