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
            .send({IAEs: [{IAE: 4, coords: [{x: 45, y: 22}]}]})
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                expect(res.body.game).to.not.be.undefined;
                expect(res.body.game.implementedIAE).lengthOf(1);
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
            .send({IAEs: [{IAE: 4, coords: [{x: 45, y: 22}]}]})
            .expect('Content-Type', /json/)
            .expect(404, done)
    });
});