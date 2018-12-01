const mongoose  = require('mongoose');
const schema = mongoose.Schema({
    action_id: mongoose.Schema.Types.ObjectId,
    action_name: 'string'
});

const Action = mongoose.model('Action',schema);
module.exports = Action;
