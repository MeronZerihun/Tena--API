var UserService = require('../services/UserService');
var User = require('../models/User');


var searchUser = function(req, res, next){
    let username = req.query.username;
    UserService.findUserByName(username, (result) => {
        res.status(result.status).json(result)
    });
}


exports.getAllOrByUsername = function(req, res, next){
    if(!req.query.username){
        UserService.findAllUsers((result)=>{
            res.status(result.status).json(result);
        });
   }
    else{
        searchUser(req, res, next);
    }
    
}

exports.getUsersByRole = function(req, res, next){
    UserService.findUsersByRole(req.params.role, (result)=>{
        res.status(result.status).json(result);
    })
}



exports.signUpUser = function(req, res, next){
    var newUser = req.body;
    UserService.insertUser(newUser.fullName, newUser.email, newUser.phoneNo, newUser.password, newUser.role,(result)=>{
        res.status(result.status).json(result);
    });
    
    
}

exports.loginUser = function(req, res, next){
    let loginArgs = req.body;
    UserService.loginUser(loginArgs.email, loginArgs.password,(result)=>{
        res.status(result.status).json(result);
    })
}

exports.updateUser = function(req,res, next){
    var user = req.body;
    user.modifiedAt = Date.now();
    if(user.password){
        
    }
    //console.log(req)
    UserService.updateAUser(req.userId, user, (result)=>{
        res.status(result.status).json(result);
    });
    
}

exports.blockUser = function(req, res, next){
    UserService.blockUser(req.params.id, (result)=>{
        res.status(result.status).json(result);
    })
}
