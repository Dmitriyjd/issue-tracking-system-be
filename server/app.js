'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const DAO = require('./dao');
const issues = require('./routes/issues');
const users = require('./routes/users');
const boards = require('./routes/boards');
const {verifyJWT_MW} = require('./security/auth');

const PORT = 3000;

const app = express();
const dao = new DAO({ host: 'localhost', port: 27017, name: 'dataBase' });

/**
 * Middleware
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public/build')));

/**
 * Routes
 */

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '../web/index.html'));
});

const router = express.Router();
router.all('*', verifyJWT_MW);
app.use('*', router);
app.use('/api/issues', issues);
app.use('/api/users', users);
app.use('/api/boards', boards);

/**
 * Start app
 */
dao.connect(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    });
});

module.exports = app;
