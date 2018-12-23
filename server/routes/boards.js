'use strict';

const express = require('express');
const controller = require('../controllers/boards');

const router = express.Router();

router.post('/', controller.createBoard);
router.post('/addUser/email', controller.shareAccessToBoard);
router.get('/', controller.getBoards);
router.get('/user_id', controller.getBoardsByUserId);
router.delete('/board/id', controller.removeBoard);

module.exports = router;
