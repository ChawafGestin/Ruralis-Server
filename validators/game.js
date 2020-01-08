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

module.exports = {
    createGame,
    createIAE,
    checkIdGame
};