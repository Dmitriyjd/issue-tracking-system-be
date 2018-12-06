const mongoose  = require('mongoose');
const schema = mongoose.Schema({
    issue_id: mongoose.Schema.Types.ObjectId,
    reporter_id: 'string',
    assignee_id: 'string',
    description: 'string',
    name: 'string',
    estimation: 'string',
    board_id: 'string'
});

const Issue = mongoose.model('Issue',schema);
module.exports = Issue;
