'use strict';

const express = require('express');
const controller = require('../controllers/boards');

const router = express.Router();

router.post('/', controller.createBoard);

module.exports = router;
