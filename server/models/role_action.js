const mongoose  = require('mongoose');
const schema = mongoose.Schema({
    role_action_id: mongoose.Schema.Types.ObjectId,
    role_id: 'string',
    action_id: 'string'
});

const Role_action = mongoose.model('Role_action',schema);
module.exports = Role_action;
