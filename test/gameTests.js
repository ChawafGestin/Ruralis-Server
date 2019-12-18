const request = require('supertest');
const {expect, assert} = require('chai');

const app = require("../app");
const Game = require("../models/Game");

describe('POST /api/public/game', () => {
    it('should return 201 OK and create a game', (done) => {
        request(app)
            .post('/api/public/game')
            .send({scenario: 2, players: [5, 4, 2, 1, 7]})
            .expect('Content-Type', /json/)
            .expect(201, (err, res) => {
                expect(res.body.game).to.not.be.undefined;
                expect(res.body.game.players).lengthOf(5);
                expect(res.body.game.cardsPicked).lengthOf(0);
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