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
            name: data.name,
            tempsTravail: 70,
            production: 0,
            environnement: 0,
            ancrageSocial: 0,
            numTour: 0,
            step:1,
            ended: false
        });
        return await game.save();
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};

exports.addIAE = async (idGame, IAEs, circleIAEs) => {
    try {
        const game = await Game.findById(idGame);
        if (!game) {
            throw new MyError(404, 'Game does not exist')
        }
        game.implementedIAE = game.implementedIAE.concat(IAEs);
        game.circleIAEs = game.circleIAEs.concat(circleIAEs);
        game.step = 2;
        return await game.save();
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};

exports.addAction = async (idGame, numAction) => {
    try {
        const game = await Game.findById(idGame);
        if (!game) {
            throw new MyError(404, 'Game does not exist')
        }
        if (numAction !== -1) {
            game.actionsDone.push(numAction);
        }
        game.step = 3;
        return await game.save();
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};

// ======================== //
// ==== Put functions ===== //
// ======================== //

exports.startGame = async (idGame) => {
    try {
        const game = await Game.findById(idGame);
        if (!game) {
            throw new MyError(404, 'Game does not exist')
        }
        game.step = 1;
        game.numTour = 1;
        return await game.save();
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};

exports.scoring = async (idGame, data) => {
    try {
        const game = await Game.findById(idGame);
        if (!game) {
            throw new MyError(404, 'Game does not exist')
        }
        game.production = data.production;
        game.environnement = data.environnement;
        game.tempsTravail = data.tempsTravail;
        game.ancrageSocial = data.ancrageSocial;
        return await game.save();
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};

exports.ended = async (idGame, data) => {
    try {
        const game = await Game.findById(idGame);
        if (!game) {
            throw new MyError(404, 'Game does not exist')
        }
        game.ended = true;
        game.victoryObjectif = data.victoryObjectif;
        game.victoryPlayers = data.victoryPlayers;
        game.victory = data.victory;
        return await game.save();
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};

exports.eventCards = async (idGame, cards) => {
    try {
        const game = await Game.findById(idGame);
        if (!game) {
            throw new MyError(404, 'Game does not exist')
        }
        game.cardsPicked = game.cardsPicked.concat(cards);
        if(game.numTour === 7) {
            game.step = 4;
        } else {
            game.numTour++;
            game.step = 1;
        }

        return await game.save();
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};

// ======================== //
// ==== Get functions ===== //
// ======================== //

exports.getGame = async (idGame) => {
    try {
        const game = await Game.findById(idGame);
        if (!game) {
            throw new MyError(404, 'Game does not exist')
        }
        return game;
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};

exports.getGames = async() => {
    try {
        return await Game.find();
    } catch (err) {
        if (err.status) throw err;
        throw new MyError(500, 'Internal server error');
    }
};