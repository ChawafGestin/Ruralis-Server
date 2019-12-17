const express = require('express');

const router = express.Router();

require('./games')(router);

module.exports = router;