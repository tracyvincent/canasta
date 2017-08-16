var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
  teamOneScore: Number,
  teamTwoScore: Number,
  winner: String
})

var Game = mongoose.model('Game', gameSchema);

module.exports = Game;
