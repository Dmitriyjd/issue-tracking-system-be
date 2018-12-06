const mongoose = require('mongoose');
const schema = mongoose.Schema({
    user_id:'string',
    board_id:'string'
});

const UserBoard = mongoose.model('user_board', schema);
module.exports = UserBoard;