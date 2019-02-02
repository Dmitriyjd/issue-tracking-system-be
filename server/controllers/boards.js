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
function getBoards(req,res){
    Boards.getBoards( (foundBoardsErrors, foundBoards) => {
        res.status(200).json({ board_array: foundBoards })
    })
}

function shareAccessToBoard(req,res) {
    Boards.shareAccessToBoard( req.body.boardId, req.body.email, (sharedAccessToBoardErrors, sharedAccessToBoard) => {
        if(!sharedAccessToBoard){
            res.status(404).json( { errors: sharedAccessToBoardErrors })
        }
        else{
            res.status(200).json({ sharedAccessToBoard })
        }
    })
}

function removeBoard(req,res) {
    Boards.removeBoard(req.body.id, (removeBoardErrors, removeBoard) =>{
        res.status(200).json({removeBoard, status: 'OK'})
    })
}

function getBoardsByUserId(req,res) {
    Boards.getBoardsByUserId(req.params.id, (gotBoardsErrors, gotBoards) => {
        if (gotBoards.length === 0) {
            res.status(404).json({errors: ['No boards found']})
        }
        else {
            res.status(200).json({ board_array: gotBoards })
        }
    });
}

module.exports = { createBoard,getBoardsByUserId, removeBoard, getBoards , shareAccessToBoard};
