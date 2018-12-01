const mongoose  = require('mongoose');
const schema = mongoose.Schema({
    role_id: mongoose.Schema.Types.ObjectId,
    role_name: 'string'
});

const Role = mongoose.model('Role',schema);
module.exports = Role;
