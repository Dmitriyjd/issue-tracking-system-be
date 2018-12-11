'use strict';
const Users = require("../dao/users.js");
const { createJWToken } = require('../security/auth');

function getUsers(req, res) {
    Users.getUsers(
        function (err, result) {
            res.send({ users: result });
        }
    )
}

function getUserById(req, res) {
    Users.getUserById(req.params.id,(err, result) => {
        if (result.length === 0) {
            res.status(404).json({ errors: ["User not exist"] })
        }
        else {
            res.status(200).json({ author: result[0] });
        }
    });
}

function createUser(req, res) {
    if (!req.body.email) {
        res.status(400).json({errors: ["E-mail is require"]});
        return;
    }
    Users.getUserById(req.body.id,() => {
        Users.createUser(req.body, (err, result) => {
            res.status(201).json({ user: result });
        });
    });
}

function logIn(req, res) {
    Users.getUser(req.body,(error, user) => {
        if (!req.body.email || !req.body.password) {
            res.status(403).json({ errors: ['Username or password is empty'] });
        }

        if (error || !user) {
            res.status(403).json({ errors: ['Wrong username or password'] });
        } else {
            const token = createJWToken({ data:{ id: user._id } });
            res.status(201).json({ id: user._id, token });
        }
    });
}

module.exports = { createUser, getUserById, getUsers, logIn };
