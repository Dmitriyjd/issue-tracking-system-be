const Issue = require("../models/issue");

function createIssue(issue, userId, columnId, callback) {
    Issue.create({...issue, reporter_id:userId, column_id:columnId}, (createIssueErrors, createIssue)=>{
        callback && callback(createIssueErrors,createIssue)
    })
}

function getIssuesByColumnId(id, callback){
    Issue.find({ column_id:id }, (foundIssuesErrors, foundIssues) => {
        callback && callback(foundIssuesErrors, foundIssues);
    });
}

function getIssue(id, callback) {
    Issue.findOne({ issue_id:id }, (foundIssueErrors, foundIssue)=>{
        callback && callback (foundIssueErrors, foundIssue)
    })
}

function removeIssue(id, callback){
    Issue.deleteOne({ issue_id:id }, (deletedIssueErrors, deletedIssue) => {
        callback && callback(deletedIssueErrors, deletedIssue);
    });
}

function editIssue(id, issue, userId, callback){
    const fullIssue = issue;
    fullIssue.assignee_id = userId;
    Issue.findOneAndUpdate({ issue_id:id }, fullIssue,{ new:true }, (updatedIssueErrors, updatedIssue) => {
        callback && callback(updatedIssueErrors, updatedIssue);
    });
}


module.exports = { getIssuesByColumnId, getIssue, createIssue, removeIssue, editIssue };
