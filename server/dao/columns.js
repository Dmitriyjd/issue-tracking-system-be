const Column = require("../models/column");

function getColumnsByBoardId(board_id, callback){
    Column.find({ board_id:board_id }, (foundColumnsErrors, gotColumns) => {
        callback && callback(foundColumnsErrors, gotColumns);
    });
}

module.exports = {getColumnsByBoardId};
