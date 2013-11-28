function spec(b) {
  
  var Bracket = function(app) {
    this.app = app;
  }

  Bracket.prototype.build = function(req, res) {
    var self = this;

    var name = req.body['name'];
    var players = JSON.parse(req.body['players']);
    var numberOfPlayers = players.length;

    var tempResponse = "Creating a new Bracket with " + numberOfPlayers + " players called " + name + ". players: " + players;
    
    //Generate access Key
    //Create Bracket in DB
    //Send access key with response

    res.send(200, tempResponse);
  }

  return Bracket;
}

module.defineClass(spec);