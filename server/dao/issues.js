const Issue = require("../models/issue");

function getIssuesByBoardId(id, callback){
    Issue.find({issue_id:id}, (err, result) => {
        callback && callback(err, result);
    });
}

function createIssue(issue, callback) {
    Issue.create(issue, (err, result) => {
        callback && callback(err, result);
    });
}

function removeIssue(id, callback){
    Issue.deleteOne({id}, (err, result) => {
        callback && callback(err, result);
    });
}

function editIssue(id, issue, callback){
    Issue.findOneAndUpdate({id}, issue,{new:true}, (err, result) => {
        callback && callback(err, result);
    });
}


module.exports = {getIssuesByBoardId, createIssue, removeIssue, editIssue};
