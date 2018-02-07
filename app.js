const restify = require('restify');
const plugins = require('restify-plugins');
const logger = require('morgan');
const fs = require('fs');

const server = restify.createServer({
  name: 'json-file-api',
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
    fs.readFile(inputFile, 'utf8', function (err, data) {
      if (err) {
        res.status(500);
        res.json(err);
      }
      res.json(JSON.parse(data));
      return next();
    });
  });
}

// ADD ROUTES HERE


server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
