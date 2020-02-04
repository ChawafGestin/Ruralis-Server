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
                const game = await gameController.addIAE(req.params.idGame, req.body.IAEs, req.body.circleIAEs);
                res.status(201).send({message: 'IAEs successfully added to the game', game});
            } catch (e) {
                res.status(e.status).send({error: e.message});
            }
        })

        .put('/game/:idGame/start', gameValidator.checkIdGame, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({error: 'Invalid id'});
            }
            try {
                const game = await gameController.startGame(req.params.idGame);
                res.status(201).send({message: 'Game successfully started', game});
            } catch (e) {
                res.status(e.status).send({error: e.message});
            }
        })

        .get('/game/:idGame', gameValidator.checkIdGame, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({error: 'Invalid id'});
            }
            try {
                const game = await gameController.getGame(req.params.idGame);
                res.status(201).send({message: 'Game successfully fetched', game});
            } catch (e) {
                res.status(e.status).send({error: e.message});
            }
        })

        .put('/game/:idGame/scoring', gameValidator.scoring, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({error: 'Invalid form data'});
            }
            try {
                const game = await gameController.scoring(req.params.idGame, req.body);
                res.status(201).send({message: 'Scoring successfully updated', game});
            } catch (e) {
                res.status(e.status).send({error: e.message});
            }
         })

        .post('/game/:idGame/action', gameValidator.addAction, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({error: 'Invalid form data'});
            }
            try {
                const game = await gameController.addAction(req.params.idGame, req.body.action);
                res.status(201).send({message: 'Action successfully added to the game', game});
            } catch (e) {
                res.status(e.status).send({error: e.message});
            }
        })

        .get('/game',  async (req, res) => {
            try {
                const games = await gameController.getGames(req.body.ended);
                res.status(201).send({message: 'Games successfully fetched', games});
            } catch (e) {
                res.status(e.status).send({error: e.message});
            }
        })

        .put('/game/:idGame/endgame', gameValidator.endGame, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({error: 'Invalid form data'});
            }
            try {
                const game = await gameController.ended(req.params.idGame, req.body);
                res.status(201).send({message: 'Game is ended', game});
            } catch (e) {
                res.status(e.status).send({error: e.message});
            }
        })
};


