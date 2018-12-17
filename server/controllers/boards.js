const Boards = require("../dao/boards");

function createBoard(req,res) {
    if(!req.body.boardName){
        res.status(404).json({errors: ["boardName is missed"]});
    }
    else {
        Boards.createBoard(req.body.boardName, req.body.userId, (err, result) => {
            res.status(200).json({result})
        })
    }
}

function removeBoard(req,res) {
    Boards.removeBoard(req.body.id, (removeBoardErrors, removeBoard) =>{
        res.status(200).json({removeBoard, status: 'OK'})
    })
}

function getBoardsByUserId(req,res) {
    Boards.getBoardsByUserId(req.body.id, (gotBoardsErrors, gotBoards) => {
        if (gotBoards.length === 0) {
            res.status(404).json({errors: ['No boards found']})
        }
        else {
            res.status(200).json({ boards: gotBoards})
        }
    });
}

module.exports = { createBoard,getBoardsByUserId, removeBoard };
