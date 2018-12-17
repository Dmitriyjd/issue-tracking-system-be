'use strict';

const express = require('express');
const controller = require('../controllers/columns');

const router = express.Router();

router.get('/board_id', controller.getColumnsByBoardsId);

module.exports = {router};
