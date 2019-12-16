const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PartieSchema = new Schema({
    production: Number,
    tempsTravail: Number,
    environnement: Number,
    ancrageSocial: Number,
    numTour: Number,
    etape: Number,
    scenario: Number,
    joueurs: Array[Number],
    victoire: Boolean,
    cartesPioches: Array[Number],
    actionsEffectuees: Array[Number],
});

const Partie = mongoose.model('Partie', PartieSchema, 'Parties');
module.exports = Partie;