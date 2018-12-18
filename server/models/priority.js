const mongoose  = require('mongoose');
const schema = mongoose.Schema({

    priority_id: mongoose.Schema.Types.ObjectId,
    priority_name:'string'
});

const Priority = mongoose.model('Priority',schema);
module.exports = Priority;
