const MyError = require('../util/error');

const Game = require('../models/Game');

// ======================== //
// ==== Post functions ==== //
// ======================== //

exports.createGame = async (data) => {
    try {
        const game = new Game({
            scenario: data.scenario,
            players: data.players
        });
        return await game.save();
    } catch (err) {
        if (err.status) throw err;
        return new MyError(500, 'Internal server error');
    }
};