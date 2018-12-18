'use strict';
const Issues = require("../dao/issues.js");

function getIssuesByColumnId(req, res) {
    Issues.getIssuesByColumnId(req.body.columnId,(gotIssuesErrors, [gotIssues]) => {
        if (gotIssues.length === 0) {
            res.status(404).json({ errors: ["Column not exist"] })
        }
        else {
            res.status(200).json({ issue: [gotIssues] });
        }
    });
}

function getIssue(req,res) {
    Issues.getIssue(req.body.id,(gotIssueErrors,gotIssue)=>{
            res.status(200).json({ issue:gotIssue })
    })
}

function createIssue(req, res) {
    Issues.createIssue(req.body, req.body.columnId, req.body.userId, (err, result) => {
        res.status(201).json({ issue: result });
    });
}

function removeIssue(req, res) {
    Issues.getIssue(req.body.id,(gotIssueErrors, gotIssue) => {
        if (gotIssue.length === 0) {
            res.status(404).json({ errors: ["Issue not exist"] });
        }
        else {
            Issues.removeIssue(req.params.issueId, () => {
                res.status(200).json({ status: 'OK' });
            });
        }
    });
}

function editIssue(req, res) {
    Issues.getIssue(req.body._id,(boardIssuesError, boardIssue) => {
        if (boardIssue === null) {
            res.status(404).json({errors: ["Issue not found"]});
        }
        else{
            Issues.editIssue(req.body._id, req.body, req.body.userId, (err, result) => {
                res.status(200).json({issue: result});
            });
        }
    });
}

module.exports = { getIssuesByColumnId, getIssue, editIssue, createIssue, removeIssue };
