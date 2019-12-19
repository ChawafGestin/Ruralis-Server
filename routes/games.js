const {validationResult} = require('express-validator');
const gameValidator = require('../validators/game');
const gameController = require('../controllers/games');


/*create a game */
module.exports = (router) => {
    router
        .post('/game', gameValidator.createGame, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({error: 'Invalid form data'});
            }
            try {
                const game = await gameController.createGame(req.body);
                res.status(201).send({message: 'Game successfully created', game});
            } catch (e) {
                res.status(e.status).send({error: e.message});
            }
        })

        .post('/game/:idGame/IAE', gameValidator.createIAE, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({error: 'Invalid form data'});
            }
            try {
                const game = await gameController.addIAE(req.params.idGame, req.body.IAEs);
                res.status(201).send({message: 'IAEs successfully added to the game', game});
            } catch (e) {
                res.status(e.status).send({error: e.message});
            }
        })

        .put('/game/:idGame/start', gameValidator.checkIdGame, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({error: 'Invalid form data'});
            }
            try {
                const game = await gameController.startGame(req.params.idGame);
                res.status(201).send({message: 'Game successfully started', game});
            } catch (e) {
                res.status(e.status).send({error: e.message});
            }
        })
};


