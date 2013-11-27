var express = require('express');
var http = require('http');
var connectUtils = require('connect/lib/utils');
var config = require('./config');

var app = express();
app.use(express.bodyParser());
var appServer = http.createServer(app);

appServer.listen(config.port);

// Routing
app.use(app.router);

// Error handling
app.all('*', function(err,req,res,next) {
  console.log(err.stack);
  res.send("Internal Server Error", 500);
});

module.exports = app;
