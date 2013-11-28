function spec(b) {
  var http = require('http');
  var path = require('path');
  var config = require('./bracketfactory/config');

  var BracketFactory = function() {
    var server = require('./bracketfactory/server');
    var router = require('./bracketfactory/router').new();
    console.log('Started BracketFactory API Server listening on port ' + config.port + '.');
  }

  return BracketFactory;  
}

module.defineClass(spec);