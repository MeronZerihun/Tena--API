var UserService = require('../services/UserService');
var User = require('../models/User');

const bcrypt = require('bcrypt');

var searchUser = function(req, res, next){
    let username = req.query.username;
    UserService.findByUsername(username, (result) => {
        res.status(res.statusCode).json(result)
    });
}



exports.getAllOrByUsername = function(req, res, next){
    if(!req.query.username){
        UserService.findAllUsers((result)=>{
            res.status(res.statusCode).json(result);
        });
   }
    else{
        searchUser(req, res, next);
    }
    
}

exports.getUsersByRole = function(req, res, next){
    UserService.findUsersByRole(req.params.role, (result)=>{
        res.status(res.statusCode).json(result);
    })
}



exports.signUpUser = function(req, res, next){
    var newUser = req.body;
    bcrypt.hash(newUser.password, 10 , (err, hash)=>{
        if(err){
            res.status(res.statusCode).json(err);
        }
        else{
            newUser.password = hash;
            UserService.insertUser(newUser.fullName, newUser.email, newUser.phoneNo, newUser.password, newUser.role,(result)=>{
                res.status(res.statusCode).json(result);
            });
        }
    });
    
}

exports.loginUser = function(req, res, next){
    let loginArgs = req.body;
    UserService.loginUser(loginArgs.email, loginArgs.password,(result)=>{
        res.status(res.statusCode).json(result);
    })
}

exports.updateUser = function(req,res, next){
    let user = req.body;
    UserService.updateAUser(req.params.id, user, (result)=>{
        res.status(res.statusCode).json(result);
    });
    
}
