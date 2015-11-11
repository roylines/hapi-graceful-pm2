# hapi-graceful-pm2
[![Circle CI](https://circleci.com/gh/roylines/hapi-graceful-pm2.svg?style=svg)](https://circleci.com/gh/roylines/hapi-graceful-pm2)

This is a [hapi plugin](http://hapijs.com/tutorials/plugins) to handle true zero downtime reloads when issuing a [pm2 gracefulReload]((https://keymetrics.io/2015/03/26/pm2-clustering-made-easy) command.

When using this plugin and calling 'pm2 gracefulReload', the 'shutdown' message will be intercepted and will waits for hapi to drain all connections before exiting the worker. This will ensure any in progress requests are completed before exiting. Whilst waiting, no new requests will be forwarded to the worker. Without this plugin the issueing of a gracefulReload will terminate any in progress requests without waiting. You can pass a timeout to the plugin. This is how long to wait for hapi to drain all connections. Note: the PM2_GRACEFUL_TIMEOUT environment variable should be set to a value higher than the plugin timeout.

The pm2 shutdown process is described [here](https://keymetrics.io/2015/03/26/pm2-clustering-made-easy).

## Usage
Register the plugin in the usual way, for instance: 

```
server.register({
    register: require('hapi-graceful-pm2'),
    options: {
        timeout: 4000
    }
}, function (err) {
});
```
