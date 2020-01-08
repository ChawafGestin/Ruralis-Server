const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const GameSchema = new Schema({
    production: Number,
    tempsTravail: Number,
    environnement: Number,
    ancrageSocial: Number,
    numTour: Number,
    step: Number,
    scenario: Number,
    players: [Number],
    victory: Boolean,
    implementedIAE: [{IAEGroup: Number, IAEType: Number, coords: [{lat: Number, lng: Number}]}],
    circleIAEs: [{IAEGroup: Number, IAEType:  Number, center: Number, radius: Number}] ,
    cardsPicked: [Number],
    actionsDone: [Number],
});

autoIncrement.initialize(mongoose.connection);
GameSchema.plugin(autoIncrement.plugin, 'Game');

const Game = mongoose.model('Game', GameSchema, 'Games');
module.exports = Game;