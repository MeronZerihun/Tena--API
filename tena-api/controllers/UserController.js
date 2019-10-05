var UserService = require('../services/UserService');

exports.getUsers = function(req, res, next){
    let users = UserService.findAllUsers();
    return res.status(200).json(users);
}

