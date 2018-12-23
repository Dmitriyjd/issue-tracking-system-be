const Board = require("../models/board");
const Column = require("../models/column");
const User_Board = require('../models/user_board');
const Priority = require('../models/priority');
const User = require('../models/user');

function createBoard(boardName, userId , callback) {
   Board.create({ board_name: boardName } ,(addBoardErrors, addBoard)=>{
       User_Board.create({ user_id: userId, board_id: addBoard._id },()=>{
           const columnNames = ['TODO','In progress','Code review','Done'];
           createColumns(columnNames, addBoard._id, () => {
               const priorityNames = ['None', 'Lowest', 'Low', 'Normal', 'Medium', 'High', 'Highest', 'Blocker'];
               createPriorities(priorityNames, () => {
                   callback && callback(addBoardErrors, addBoard);
               })
           });

       })
    })
}

function shareAccessToBoard(boardId, email, callback){
    User.findOne({ email: email }, (foundUserErrors, foundUser) => {
        if(foundUserErrors || !foundUser) {
            callback && callback(foundUserErrors, foundUser);
        }
        else {
            User_Board.create({
                board_id: boardId,
                email: foundUser.email
            }, (sharingAccessToBoardErrors, sharingAccessToBoard) => {
                callback && callback(sharingAccessToBoardErrors, sharingAccessToBoard);
            })
        }
    });

}

function getBoards(callback) {
    Board.find({}, (foundBoardErrors, foundBoards) => {
        callback && callback(foundBoardErrors, foundBoards);
    })
}

function createPriorities(priorityNames, callback){
    Priority.create({priority_name: priorityNames[0]},(err, result) => {
        if(priorityNames.length === 1){
            callback && callback(err, result);
        }
        else {
            createPriorities(priorityNames.slice(1), callback);
        }
    })
}

function createColumns(columnNames, boardId, callback) {
    Column.create({ column_name:columnNames[0], board_id:boardId },( ) => {
        if (columnNames.length === 1) {
            callback && callback();
        }
        else {
            createColumns(columnNames.slice(1),boardId,callback);
        }
    } )
}

function removeBoard(boardId, callback){
    Board.remove({board_id: boardId}, (removeBoardErrors, removeBoard) => {
        callback && callback(removeBoardErrors, removeBoard);
    })
}

function getBoardsByUserId(id, callback){
    User_Board.find({ user_id:id }, (foundIssuesErrors, foundIssues) => {
        Board.find({ board_id: foundIssues.board_id}, (gotBoardsErrors, gotBoards) =>{
            callback && callback(gotBoardsErrors, gotBoards);
        });
    });
}


module.exports = { createBoard, getBoardsByUserId, removeBoard, getBoards, shareAccessToBoard};
