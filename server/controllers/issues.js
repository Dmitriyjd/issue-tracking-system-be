'use strict';
const Issues = require("../dao/issues.js");

function getIssuesByBoardId(req, res) {
    Issues.getIssuesByBoardId(req.params.id,(err, result) => {
        if (result.length === 0) {
            res.status(404).json({errors: ["Board not exist"]})
        }
        else {
            res.status(200).json({ issue: result[0] });
        }
    });
}
function createIssue(req, res) {
    Issues.createIssue(req.body, (err, result) => {
        res.status(201).json({ issue: result });
    });
}

function removeIssue(req, res) {
    Issues.getIssuesByBoardId(req.params.id,(gotIssueErrors, gotIssue) => {
        if (gotIssue.length === 0) {
            res.status(404).json({errors: ["Issue not exist"]});
        }
        else {
            Issues.removeIssue(req.params.id, () => {
                res.status(200).json({ status: 'OK' });
            });
        }
    });
}

function editIssue(req, res) {
    Issues.getIssuesByIssueId(req.body._id,(boardIssuesErrors, boardIssues) => {
        if (boardIssues.length !== 0) {
            res.status(400).json({errors: ["Issue with this id already exist"]});
        }
        Issues.getIssuesByBoardId(req.params.id,(err, result) => {
            if (result.length === 0) {
                res.status(404).json({errors: ["Board with this id not exist"]});
            } else {
                Issues.editIssue(req.params.id, req.body, (err, result) => {
                    res.status(200).json({ issue: result });
                });
            }
        });
    });
}




module.exports = {getIssuesByBoardId,editIssue, createIssue, removeIssue};
