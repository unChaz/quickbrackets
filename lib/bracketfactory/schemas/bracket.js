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
    bracket: Object,
    maxTier: Number
  });

  Bracket.methods.generatePrivateToken = function(){
    this.privateToken = encrypter.externId(this._id);
  };

  Bracket.methods.generatePublicToken = function(){
    this.publicToken = hashids.encryptHex(this._id);
  };

  Bracket.methods.buildBracket = function(){
    var self = this;
    var bracket = [];
    var tier = 0;

    self.players.forEach(function(player){
      bracket.push(self._getBracketNode(player, tier, null, null));
    });
    console.log(bracket);
    
    while(bracket.length > 1){
      tier ++;
      bracket = self._getNextTier(bracket, tier);
    }

    self.maxTier = tier;
    self.bracket = bracket;

  };

  Bracket.methods._getBracketNode = function(winner, tier, topBracket, bottomBracket){
    return {
      'winner': winner,
      'tier': tier,
      'topBracket': topBracket,
      'bottomBracket': bottomBracket
    }
  };

  Bracket.methods._getNextTier = function(lastRound, tier){
    var self = this;
    var nextRound = [];
    var index = 0;
    while(index < lastRound.length){
      nextRound.push(self._getBracketNode(null, tier, lastRound[index], lastRound[index+1]));
      delete lastRound[index+1];
      delete lastRound[index];
      console.log(lastRound);
      
      index += 2;
    }
    return nextRound;
  };

  return Bracket = mongoose.model('Bracket', Bracket);
};

module.defineClass(spec);