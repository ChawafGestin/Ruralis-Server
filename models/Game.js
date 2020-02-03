const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const GameSchema = new Schema({
    production: Number,
    tempsTravail: Number,
    environnement: Number,
    ancrageSocial: Number,
    numTour: Number,
    ended: Boolean,
    step: Number,
    scenario: Number,
    players: [Number],
    victory: Boolean,
    implementedIAE: [{IAEGroup: Number, IAEType: Number, layerType: String, unity: Number, coords: [{lat: Number, lng: Number}]}],
    circleIAEs: [{IAEGroup: Number, IAEType:  Number, layerType: String, center: {lat: Number, lng: Number}, unity: Number}] ,
    cardsPicked: [Number],
    actionsDone: [Number],
    victoryPlayers:[Number],
    victoryObjectif: Boolean
});

autoIncrement.initialize(mongoose.connection);
GameSchema.plugin(autoIncrement.plugin, 'Game');

const Game = mongoose.model('Game', GameSchema, 'Games');
module.exports = Game;