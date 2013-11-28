function spec(b) {
  var Bracket = b.Bracket || require('../schemas/bracket').class();
  
  var BracketController = function(app) {
    this.app = app;
  }

  BracketController.prototype.build = function(req, res) {
    var self = this;

    var players = req.body['players'].split(",");

    var bracket = new Bracket();

    bracket.name = req.body['name'];
    bracket.players = players;
    bracket.generatePrivateToken();
    bracket.generatePublicToken();
    bracket.buildBracket();

    bracket.save(function(err){
      res.send(200, self._filter(bracket, 'privateToken'));
    });  
  };

  BracketController.prototype.get = function(req, res) {
    var self = this;
    var token = req.params['token'];
    var filters = {};
    var type;

    if(token.length == 20){
      type = 'publicToken';
    } else if (token.length == 22){
      type = 'privateToken';
    } else {
      res.send(404);
    }

    filters[type] = token;

    Bracket.findOne(filters, function(err, bracket){
      if (err) console.log(err);
      if(bracket){
        return res.send(self._filter(bracket, type));
      } else {
        return res.send(404, "bracket not found.");
      }
    });
  };

  BracketController.prototype._filter = function(bracket, type){
    b = bracket.toObject();
    delete b["_id"];
    delete b["__v"];
    if (type === "publicToken"){
      delete b["privateToken"];
    }
    return b;
  }

  return BracketController;
}

module.defineClass(spec);