function spec(b) {
  var server = b.server || require('./server');
  var config = require('./config');
  var Bracket = b.Bracket || require('./models/bracket').class();

  var Router = function() {
    var B = new Bracket();

    server.post('/brackets/create', B.build.bind(B));
  };

  return Router;
}

module.defineClass(spec);