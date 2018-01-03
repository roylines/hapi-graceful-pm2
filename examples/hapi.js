const Hapi = require('hapi');

const server = new Hapi.Server({
    port: 3000
});

server.register({
    register: require('../index.js'),
    options: {
        timeout: 4000
    }
}).then((err) => {
    console.log('registered', err);
});

server.route({
  method: 'GET',
  path: '/',
  handler(request, h) {
      setTimeout(() => {
        return 'Hello, world!';
      }, 2000);
  }
});

server.start().then(() => {
    console.log('Server running at:', server.info.uri);
}).catch((err) => {
    throw err;
});
