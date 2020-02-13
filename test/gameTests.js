const request = require('supertest');
const {expect, assert} = require('chai');

const app = require("../app");
const Game = require("../models/Game");

let idGame;
describe('POST /api/public/game', () => {
    before((done) => {
        Promise.all([Game.deleteMany({}),]).then(async () => {
            done();
        })
    });

    it('should return 201 OK and create a game', (done) => {
        request(app)
            .post('/api/public/game')
            .send({scenario: 2, players: [5, 4, 2, 1, 7]})
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                expect(res.body.game).to.not.be.undefined;
                expect(res.body.game.players).lengthOf(5);
                expect(res.body.game.cardsPicked).lengthOf(0);
                idGame = res.body.game._id;
                done();
            });
    });
    it('should return 422 invalid data', (done) => {
        request(app)
            .post('/api/public/game')
            .send({scenario: 2, players: [5, 4, 2]})
            .expect('Content-Type', /json/)
            .expect(422, done)
    });
});

describe('POST /api/public/game/:idGame/IAE', () => {
    it('should return 201 OK ', (done) => {
        request(app)
            .post(`/api/public/game/${idGame}/IAE`)
            .send({IAEs: [{IAEGroup: 2, IAEType: 4, coords: [{x: 45, y: 22}]}], circleIAEs: [{IAEGroup: 2, IAEType: 4, center: 3}]})
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                expect(res.body.game).to.not.be.undefined;
                expect(res.body.game.implementedIAE).lengthOf(1);
                expect(res.body.game.circleIAEs).lengthOf(1);
                expect(res.body.game.circleIAEs[0].IAEType === 4);
                done();
            });
    });
    it('should return 422 invalid data', (done) => {
        request(app)
            .post(`/api/public/game/${idGame}/IAE`)
            .send({IAEs: 3})
            .expect('Content-Type', /json/)
            .expect(422, done)
    });
    it('should return 404 ', (done) => {
        request(app)
            .post(`/api/public/game/66666/IAE`)
            .send({IAEs: [{IAE: 4, coords: [{x: 45, y: 22}]}], circleIAEs:[]})
            .expect('Content-Type', /json/)
            .expect(404, done)
    });
});

describe('PUT /api/public/game/:idGame/start', () => {
    it('should return 201 OK ', (done) => {
        request(app)
            .put(`/api/public/game/${idGame}/start`)
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                expect(res.body.game).to.not.be.undefined;
                expect(res.body.game.numTour === 1);
                done();
            });
    });
    it('should return 422 invalid data', (done) => {
        request(app)
            .put(`/api/public/game/sdcsc/start`)
            .expect('Content-Type', /json/)
            .expect(422, done)
    });
    it('should return 404 ', (done) => {
        request(app)
            .put(`/api/public/game/666666/start`)
            .expect('Content-Type', /json/)
            .expect(404, done)
    });
});

describe('GET /api/public/game/:idGame/start', () => {
    it('should return 201 OK ', (done) => {
        request(app)
            .get(`/api/public/game/${idGame}`)
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                expect(res.body.game).to.not.be.undefined;
                expect(res.body.game._id === idGame);
                done();
            });
    });
    it('should return 422 invalid data', (done) => {
        request(app)
            .get(`/api/public/game/sdcsc`)
            .expect('Content-Type', /json/)
            .expect(422, done)
    });
    it('should return 404 ', (done) => {
        request(app)
            .get(`/api/public/game/666666`)
            .expect('Content-Type', /json/)
            .expect(404, done)
    });
});

describe('PUT /api/public/game/:idGame/scoring', () => {
    it('should return 201 OK ', (done) => {
        request(app)
            .put(`/api/public/game/${idGame}/scoring`)
            .send({production: 42, tempsTravail: 21, ancrageSocial: 12, environnement: 23})
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                expect(res.body.game).to.not.be.undefined;
                expect(res.body.game.tempsTravail === 21);
                expect(res.body.game.production === 42);
                expect(res.body.game.ancrageSocial === 12);
                expect(res.body.game.environnement === 23);
                done();
            });
    });
    it('should return 422 invalid data', (done) => {
        request(app)
            .put(`/api/public/game/sdcsc/scoring`)
            .expect('Content-Type', /json/)
            .expect(422, done)
    });
    it('should return 422 invalid data', (done) => {
        request(app)
            .put(`/api/public/game/${idGame}/scoring`)
            .send({fabrki: 42, tempsTravail: 21, ancrageSocial: 12, environnement: 23})
            .expect('Content-Type', /json/)
            .expect(422, done)
    });
    it('should return 404 ', (done) => {
        request(app)
            .put(`/api/public/game/666666/scoring`)
            .send({production: 42, tempsTravail: 21, ancrageSocial: 12, environnement: 23})
            .expect('Content-Type', /json/)
            .expect(404, done)
    });
});

describe('POST /api/public/game/:idGame/action', () => {
    it('should return 201 OK ', (done) => {
        request(app)
            .post(`/api/public/game/${idGame}/action`)
            .send({action: 4})
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                expect(res.body.game).to.not.be.undefined;
                expect(res.body.game.actionsDone).lengthOf(1);
                expect(res.body.game.step === 3);
                done();
            });
    });
    it('should return 422 invalid data', (done) => {
        request(app)
            .post(`/api/public/game/${idGame}/action`)
            .expect('Content-Type', /json/)
            .expect(422, done)
    });
    it('should return 404 ', (done) => {
        request(app)
            .post(`/api/public/game/66666/action`)
            .send({action: 4})
            .expect('Content-Type', /json/)
            .expect(404, done)
    });
});

describe('GET /api/public/game', () => {
    it('should return 201 OK ', (done) => {
        request(app)
            .get(`/api/public/game`)
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                expect(res.body.games).to.not.be.undefined;
                expect(res.body.games).lengthOf(1);
                done();
            });
    });
});

describe('PUT /api/public/game/:idGame/endgame', () => {
    it('should return 201 OK ', (done) => {
        request(app)
            .put(`/api/public/game/${idGame}/endgame`)
            .send({victoryObjectif: true, victoryPlayers: [5,3,1], victory: false})
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                expect(res.body.game).to.not.be.undefined;
                expect(res.body.game.ended);
                expect(!res.body.game.victory);
                done();
            });
    });
    it('should return 422 invalid data', (done) => {
        request(app)
            .put(`/api/public/game/sdcsc/endgame`)
            .expect('Content-Type', /json/)
            .expect(422, done)
    });
    it('should return 422 invalid data', (done) => {
        request(app)
            .put(`/api/public/game/${idGame}/endgame`)
            .send({fabrki: 42, tempsTravail: 21, ancrageSocial: 12, environnement: 23})
            .expect('Content-Type', /json/)
            .expect(422, done)
    });
    it('should return 404 ', (done) => {
        request(app)
            .put(`/api/public/game/666666/endgame`)
            .send({victoryObjectif: true, victoryPlayers: [5,3,1], victory: false})
            .expect('Content-Type', /json/)
            .expect(404, done)
    });
});

describe('PUT /api/public/game/:idGame/eventcards', () => {
    it('should return 201 OK ', (done) => {
        request(app)
            .put(`/api/public/game/${idGame}/eventcards`)
            .send({cardsPicked: [5,8,12]})
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                expect(res.body.game).to.not.be.undefined;
                expect(res.body.game.step === 1);
                done();
            });
    });
    it('should return 422 invalid data', (done) => {
        request(app)
            .put(`/api/public/game/sdcsc/eventcards`)
            .expect('Content-Type', /json/)
            .expect(422, done)
    });
    it('should return 422 invalid data', (done) => {
        request(app)
            .put(`/api/public/game/${idGame}/eventcards`)
            .send({cardsPicked: true, tempsTravail: 21, ancrageSocial: 12, environnement: 23})
            .expect('Content-Type', /json/)
            .expect(422, done)
    });
    it('should return 404 ', (done) => {
        request(app)
            .put(`/api/public/game/666666/eventcards`)
            .send({cardsPicked: [5,8,12]})
            .expect('Content-Type', /json/)
            .expect(404, done)
    });
});