var restify = require('restify');
var plugins = require('restify-plugins');
var logger = require('morgan');

const server = restify.createServer({
  name: 'mock-server',
  version: '1.0.0'
});
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());
server.use(
  function crossOrigin(req, res, next) { // allow cross-origin
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);
server.use(logger('dev'));

function addRoute(path, method = 'GET', inputFile = `./fixtures${path}.json`) {
  server[method.toLowerCase()](path, function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    let jsonFile = require(inputFile);
    res.json(jsonFile);
    return next();
  });
}

// ADD ROUTES HERE


server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
