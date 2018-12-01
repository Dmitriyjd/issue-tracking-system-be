const User = require("../models/user.js");
const Role = require("../models/role.js");

function getUsers(callback) {
    User.find({}, (err, result) => {
        callback && callback(err, result);
    });
}

function getUserById(id, callback){
    User.find({id}, (err, result) => {
        callback && callback(err, result);
    });
}

function createUser(user, callback) {
    const userFull = user;
    userFull.team_id = '';
    Role.find({role_name: 'user'}, (defaultRoleErrors, defaultRole) => {
        if (defaultRole.length === 0) {
            Role.create({role_name: 'user'}, (createdDefaultRoleErrors, createdDefaultRole) => {
                    userFull.role_id = createdDefaultRole.role_id;
                    User.create(userFull, (createdUserErrors, createdUser) => {
                        callback && callback(createdUserErrors, createdUser);
                    });
                }
            )
        }
        else{userFull.role_id = result.role_id;
        User.create(user_full, (errr, result3) => {
            callback && callback(errr, result3);
        });}
    });

}




module.exports = {getUsers, getUserById, createUser};
