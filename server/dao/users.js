const User = require("../models/user.js");
const Role = require("../models/role.js");

function getUsers(callback) {
    User.find({}, (allUsersListErrors, allUsersList) => {
        callback && callback(allUsersListErrors, allUsersList);
    });
}

function getUserById(id, callback){
    User.findOne({ id }, (gottenUserErrors, gottenUser) => {
        callback && callback(gottenUserErrors, gottenUser);
    });
}

function createUser(user, callback) {
    const userFull = user;
    Role.find({ role_name: 'user' }, (defaultRoleErrors, defaultRole) => {
        if (defaultRole.length === 0) {
            Role.create({ role_name: 'user' }, (createdDefaultRoleErrors, createdDefaultRole) => {
                    userFull.role_id = createdDefaultRole._id;
                    User.create(userFull, (createdUserErrors, createdUser) => {
                        callback && callback(createdUserErrors, createdUser);
                    });
                }
            )
        }
        else {
            Role.findOne({ role_name: 'user' }, (defaultRoleErrors, defaultRole1) => {
                userFull.role_id = defaultRole1._id;
                User.create(userFull, (createdUserErrors, createdUser) => {
                    callback && callback(createdUserErrors, createdUser);
                });
            })
        }
    });

}




module.exports = { getUsers, getUserById, createUser };
