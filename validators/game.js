const { check } = require('express-validator');

const createGame = [
    check('scenario')
        .not().isEmpty()
        .isInt(),
    check('players')
        .isArray({min:5, max:7}),
    check('name')
        .not().isEmpty()
        .isString(),
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
        .isArray(),
];

const eventCards = [
    check('cardsPicked')
        .not().isEmpty()
        .isArray({min:3, max:3}),
];

module.exports = {
    createGame,
    createIAE,
    checkIdGame,
    scoring,
    addAction,
    endGame,
    eventCards
};