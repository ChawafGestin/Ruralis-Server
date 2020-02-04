const { check } = require('express-validator');

const createGame = [
    check('scenario')
        .not().isEmpty()
        .isInt(),
    check('players')
        .isArray({min:5, max:7})

];

const createIAE = [
    check('IAEs')
        .isArray(),
    check('circleIAEs')
        .isArray(),
    check('idGame')
        .not().isEmpty()
        .isInt()
];

const checkIdGame = [
    check('idGame')
        .not().isEmpty()
        .isInt()
];

const scoring = [
    check('idGame')
        .not().isEmpty()
        .isInt(),
    check('production')
        .not().isEmpty()
        .isNumeric(),
    check('tempsTravail')
        .not().isEmpty()
        .isNumeric(),
    check('ancrageSocial')
        .not().isEmpty()
        .isNumeric(),
    check('environnement')
        .not().isEmpty()
        .isNumeric(),
];

const addAction = [
    check('idGame')
        .not().isEmpty()
        .isInt(),
    check('action')
        .not().isEmpty()
        .isInt(),
];

const endGame = [
    check('idGame')
        .not().isEmpty()
        .isInt(),
    check('victory')
        .not().isEmpty()
        .isBoolean(),
    check('victoryObjectif')
        .not().isEmpty()
        .isBoolean(),
    check('victoryPlayers')
        .not().isEmpty()
        .isArray(),
];

module.exports = {
    createGame,
    createIAE,
    checkIdGame,
    scoring,
    addAction,
    endGame
};