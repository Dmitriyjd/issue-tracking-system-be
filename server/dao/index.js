const mongoose = require('mongoose');

/**
 * Data Access Layer
 *
 * @param {Object} config - database config
 * @constructor
 */
function DAO(config) {
    this.daoConfig = 'mongodb://' + config.host + ':' + config.port + '/' + config.name;
    DAO.prototype.connect = callback => {
        if (mongoose.connection.readyState === 0) {
            mongoose.connect(this.daoConfig, { })
                .then(callback)
                .catch(callback);
        }
    }
}

/**
 * Create database instance and load init data
 * @param {Object} data - init database data
 * @param {Function} callback - two params err, callback result
 * @returns {void}
 */
DAO.prototype.init = function (data, callback) {
    data.collections.forEach(function (element) {
        mongoose.connection.createCollection(element.name)
            .then(() => {
                mongoose.connection.collections[element.name].insert(element.rows);
            })
            .then(callback)
            .catch(callback);
    });
};

/**
 * Clear database
 * @param {Function} callback - two params err, callback result
 * @returns {void}
 */
DAO.prototype.clear = function(callback) {
    mongoose.connection.dropDatabase()
        .then(callback)
        .catch(callback);
};

module.exports = DAO;
