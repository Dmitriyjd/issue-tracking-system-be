const Priorities = require('../dao/priorities');

function getPriorities (req,res){
        Priorities.getPriorities( (gotPrioritiesErrors, gotPriorities)=>{
            if(gotPriorities.length === 0){
                res.status(404).json({ errors:['Priorities not found'] })
            }
            else{
                res.status(200).json({ priorities: gotPriorities })
            }
        })
}

module.exports = { getPriorities };
