'use strict';

const express = require('express');
const controller = require('../controllers/issues');

const router = express.Router();

router.get('/:boardId', controller.getIssuesByBoardId);
router.put('/:id', controller.editIssue);
router.post('/', controller.createIssue);
router.delete('/:id', controller.removeIssue);

module.exports = router;
