var User = require('../models/User');
const bcrypt = require('bcrypt');

exports.findAllUsers = function (returnFn){
    User.find({}, function(err, res){
        if(err)
            return returnFn({error: err});
        returnFn(res);
    });
}

exports.findUsersByRole = function (role, returnFn){
    User.find({role: role}, function(err, res){
        if(err){
            return returnFn({error: err});
        }
        else if(res.length > 0){
            return returnFn(res);
        }
        returnFn({error: 'No user found'});
        
    })
}

exports.insertUser = function (fullName, email, phoneNo, password, role, returnFn){
    let user = new User({fullName: fullName, email: email, phoneNo: phoneNo,password: password, role: role});
    user.save((err, res)=>{
        if(err)
            return returnFn({error: err});
        returnFn(res);
    });
    
}

exports.updateAUser = function(id, newUser, returnFn){
    User.findByIdAndUpdate({_id: id}, newUser,{new: true}, function(err, result){
        if(err) 
            return returnFn({error: err}); 
        else if(result)
            return returnFn(result);
        returnFn({error: err}) 
        
    });

}

exports.loginUser = function(email, password, returnFn){
    User.find({email: email}, function(err, res){
        if(err)
            return returnFn({error: err});
        else if(res.length > 0){
            bcrypt.compare(password, res.password, function(err){
                if(err)
                    return returnFn({error: err});
                else
                    return returnFn(res);
            })
        }
        returnFn({error: 'No user found'})
    })
}

exports.blockUser = function(userId, returnFn){
    User.findByIdAndUpdate({_id: userId}, {status: 'blocked'}, {new: true}, function(err, result){
        if(err)
            return returnFn({error: err});
        else if(result)
            returnFn(result);
        returnFn({error: "No user found"});
    })
}

exports.findUserById = function(id, returnFn){
    User.find({_id: id}, function(err, result){
        if(err)
            return returnFn({error: err});
        else if(result.length > 0)
            return returnFn({success: 'User found'});
        returnFn({error: 'No user found'});
        
    })
}

exports.findUserByName = function(name, returnFn){
    User.find({fullName: {$regex:`${name}*`, $options:'i'}}, function(err, result){
        if(err)
            return returnFn({error: err});
        else if(result.length > 0)
            return returnFn(result);
        returnFn({error: 'No user found'});
    })
}