const Column = require("../models/column");

function getColumnsByBoardId(board_id, callback){
    Column.find({ board_id:board_id }, (foundIssuesErrors, foundIssues) => {
        callback && callback(foundIssuesErrors, foundIssues);
    });
}

module.exports = {getColumnsByBoardId};
