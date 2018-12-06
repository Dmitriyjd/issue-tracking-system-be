const Board = require("../models/board");
const Column = require("../models/column");
const User_Board = require('../models/user_board');

function createBoard(boardName, userId , callback) {
   Board.create({ board_name: boardName } ,(addBoardErrors, addBoard)=>{
       User_Board.create({ user_id: userId, board_id: addBoard._id },()=>{
           const columnNames = ['TODO','In progress','Code review','Done'];
           createColumns(columnNames, addBoard._id, () => {
               callback && callback(addBoardErrors, addBoard);
           });
       })
    })
}

function createColumns(columnNames, boardId, callback) {
    Column.create({ column_name:columnNames[0], board_id:boardId },()=>{
        if(columnNames.length === 1){
            callback && callback();
        }
        else{
            createColumns(columnNames.slice(1),boardId,callback);
        }
    } )
}

module.exports = {createBoard};
