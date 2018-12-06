const Boards = require("../dao/boards");

function createBoard(req,res) {
    Boards.createBoard(req.body.boardName, req.body.userId,(err,result)=>{
        console.log(result);
        res.status(200).json({ result })
    })
}

module.exports = {createBoard};
