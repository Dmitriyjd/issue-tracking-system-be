const mongoose  = require('mongoose');
const schema = mongoose.Schema({
    column_id: mongoose.Schema.Types.ObjectId,
    board_id: 'string',
    column_name: 'string'
});

const Column = mongoose.model('Column',schema);
module.exports = Column;
