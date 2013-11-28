function spec(b) {
  var server = b.server || require('./server');
  var config = require('./config');
  var BracketController = b.BracketController || require('./controllers/bracketController').class();

  var Router = function() {
    var B = new BracketController();

    server.post('/api/brackets/new', B.build.bind(B));
    server.get('/api/brackets/:token', B.get.bind(B));
  };

  return Router;
}

module.defineClass(spec);