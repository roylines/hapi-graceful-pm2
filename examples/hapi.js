const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
  port: 3000
});

server.register({
    register: require('../index.js'),
    options: {
        timeout: 4000
    }
}, function (err) {
  console.log('registered', err);
});

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    setTimeout(() => {
      reply('Hello, world!');
    }, 2000);
  }
});

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
