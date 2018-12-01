'use strict';
var Users = require("../dao/users.js");


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
            res.status(404).json({errors: ["User not exist"]})
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
    Users.getUserById(req.body.id,(err, result) => {
            Users.createUser(req.body, (err, result) => {
                res.status(201).json({ user: result });
            });
    });
}

module.exports = {createUser, getUserById, getUsers};
