const mongoose  = require('mongoose');
const schema = mongoose.Schema({
    team_id: mongoose.Schema.Types.ObjectId,
    team_name: 'string',
    board_id: 'string'
});

const Team = mongoose.model('Team',schema);
module.exports = Team;
