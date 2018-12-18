'use strict';

const express = require('express');
const controller = require('../controllers/priorities');

const router = express.Router();

router.get('/', controller.getPriorities);

module.exports = router;
