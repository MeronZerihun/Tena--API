var User = require('../models/User');
const bcrypt = require('bcrypt');

exports.findAllUsers = function (returnFn){
    User.find({}, function(err, res){
        if(err)
            return returnFn(err);
        returnFn(res);
    });
}

exports.findUsersByRole = function (role, returnFn){
    User.find({role: role}, function(err, res){
        if(err)
            return returnFn(err);
        returnFn(res);
    })
}

exports.insertUser = function (fullName, email, phoneNo, password, role, returnFn){
    let user = new User({fullName: fullName, email: email, phoneNo: phoneNo,password: password, role: role});
    user.save((err, res)=>{
        if(err)
            return returnFn(err);
        returnFn(res);
    });
    
}
exports.findByUsername = function(username, returnFn){
    User.find({fullName: username},function(err, res){
        if(err)
            return returnFn(err);
        returnFn(res);
    });

}

exports.updateAUser = function(id, newUser, returnFn){
    User.findByIdAndUpdate({_id: id}, newUser,{new: true}, function(err, result){
        if(err) 
            return returnFn(err); 
        returnFn(result); 
    });

}

exports.loginUser = function(email, password, returnFn){
    User.find({email: email}, function(err, res){
        if(err)
            return returnFn(err);
        else{
            bcrypt.compare(password, res.password, function(err){
                if(err)
                    returnFn(err);
                else
                    returnFn({message: 'Login Success'});
            })
        }
    })
}
