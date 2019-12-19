const MyError = require('../util/error');

const Game = require('../models/Game');

// ======================== //
// ==== Post functions ==== //
// ======================== //

exports.createGame = async (data) => {
    try {
        const game = new Game({
            scenario: data.scenario,
            players: data.players,
            tempsTravail: 70,
            production: 0,
            environnement: 0,
            ancrageSocial: 0,
            numTour: 0
        });
        return await game.save();
    } catch (err) {
        if (err.status) throw err;
        return new MyError(500, 'Internal server error');
    }
};

exports.addIAE = async (idGame, IAEs) => {
    try {
        const game = await Game.findById(idGame);
        if (!game) {
            return new MyError(404, 'Game does not exist')
        }
        game.update({$push: {IAE : {$each: IAEs}}});
        return await game.save();
    } catch (err) {
        if (err.status) throw err;
        return new MyError(500, 'Internal server error');
    }
};