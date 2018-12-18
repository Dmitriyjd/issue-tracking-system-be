const Columns = require("../dao/columns");

function getColumnsByBoardsId(req,res) {
    Columns.getColumnsByBoardId(req.body.id,(gotColumnsErrors, gotColumns)=>{
        res.status(200).json({ columns: gotColumns })
    })
}

module.exports = {getColumnsByBoardsId};
