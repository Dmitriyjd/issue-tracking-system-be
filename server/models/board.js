const mongoose  = require('mongoose');
const schema = mongoose.Schema({
    board_id: mongoose.Schema.Types.ObjectId,
    board_name: 'string'
});

const Board = mongoose.model('Board',schema);
module.exports = Board;
