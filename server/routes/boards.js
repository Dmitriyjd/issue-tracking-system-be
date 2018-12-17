'use strict';

const express = require('express');
const controller = require('../controllers/boards');

const router = express.Router();

router.post('/', controller.createBoard);
router.get('/user_id', controller.getBoardsByUserId);
router.delete('/board_id', controller.removeBoard);

module.exports = router;
