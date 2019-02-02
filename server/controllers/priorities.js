const Priorities = require('../dao/priorities');

function getPriorities (req,res){
        Priorities.getPriorities( (gotPrioritiesErrors, gotPriorities)=>{
            res.status(200).json({ priority_array: gotPriorities })
        })
}

module.exports = { getPriorities };
