function spec(b) {
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var Hashids = require("hashids");
  var config = require('../config');
  var hashids = new Hashids(config.credentials.encKey);
  var Encrypter = require('../encrypter').class();
  var encrypter = new Encrypter();

  var Bracket = new Schema({
    privateToken: {type: String, unique: true},
    publicToken: {type: String, unique: true},
    name: String,
    players: Array,
  });

  Bracket.methods.generatePrivateToken = function(){
    this.privateToken = encrypter.externId(this._id);
  };

  Bracket.methods.generatePublicToken = function(){
    this.publicToken = hashids.encryptHex(this._id);
  };

  return Bracket = mongoose.model('Bracket', Bracket);
};

module.defineClass(spec);