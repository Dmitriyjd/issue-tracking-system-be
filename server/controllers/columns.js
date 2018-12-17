const Columns = require("../dao/columns");

function getColumnsByBoardsId(req,res) {
    Columns.getColumnsByBoardId(req.body.id,(gotColumnsErrors, gotColumns)=>{
        if(gotColumns.length === 0){
            res.status(404).json({ errors:['Columns not found'] })
        }
        else{
            res.status(200).json({ columns: gotColumns })
        }
    })
}

module.exports = {getColumnsByBoardsId};
