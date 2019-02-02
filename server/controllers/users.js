'use strict';
const Users = require("../dao/users.js");
const { createJWToken } = require('../security/auth');

function getUsers(req, res) {
    Users.getUsers(
        (err, result) =>{
            res.status(200).json ({ users_array: result });
        }
    )
}

function getUserById(req, res) {
    Users.getUserById( req.params.id ,(err, result) => {
        res.status(200).json({ result});
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
    if (!req.body.email || !req.body.password) {
        res.status(403).json({ errors: ['Username or password is empty'] });
        return;
    }

    Users.getUser(req.body,(error, user) => {
        if (error || !user) {
            res.status(403).json({ errors: ['Wrong username or password'] });
        } else {
            const token = createJWToken({ data:{ id: user._id } });
            res.status(201).json({ id: user._id, token });
        }
    });
}

module.exports = { createUser, getUserById, getUsers, logIn };
