const mongoose  = require('mongoose');
const schema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    first_name: 'string',
    last_name: 'string',
    email: 'string',
    password: 'string',
    role_id: 'string',
    team_id: 'string'
});

const User = mongoose.model('User',schema);
module.exports = User;
