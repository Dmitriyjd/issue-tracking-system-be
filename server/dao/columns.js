const Column = require("../models/column");

function getColumnsByBoardId(id, callback){
    Column.find({ board_id:id }, (foundIssuesErrors, foundIssues) => {
        callback && callback(foundIssuesErrors, foundIssues);
    });
}

module.exports = {getColumnsByBoardId};
