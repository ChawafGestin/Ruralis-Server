const { check } = require('express-validator');

const createGame = [
    check('scenario')
        .not().isEmpty()
        .isInt()
];

module.exports = {
    createGame,
};