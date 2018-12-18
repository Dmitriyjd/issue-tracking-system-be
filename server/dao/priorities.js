const Priority = require('../models/priority');

function getPriorities(callback) {
    Priority.find(( foundPrioritiesErrors, foundPriorities) => {
        callback && callback (foundPrioritiesErrors, foundPriorities);
    })
}

module.exports = {getPriorities};
