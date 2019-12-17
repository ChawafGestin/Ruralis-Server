const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GameSchema = new Schema({
    production: Number,
    tempsTravail: Number,
    environnement: Number,
    ancrageSocial: Number,
    numTour: Number,
    step: Number,
    scenario: Number,
    players: Array[Number],
    victory: Boolean,
    implementedIAE: [{IAE: Number, coords: [{x: Schema.Types.Decimal128, y: Schema.Types.Decimal128}]}],
    cardsPicked: Array[Number],
    actionsDone: Array[Number],
});

const Game = mongoose.model('Game', GameSchema, 'Games');
module.exports = Game;