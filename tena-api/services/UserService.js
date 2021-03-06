var User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const values = require('../config/values');


function hashPassword(password, user, returnFn){
    bcrypt.hash(password, 10 , (err, hash)=>{
        if(err){
            returnFn({error: "No password field provided", status: 400});
        }
        else{
            user.password = hash;
            returnFn(user);
        }
    })
}

function updateUser(id, user, returnFn){
    User.findByIdAndUpdate({_id: id}, user,{new: true}, function(err, result){
        if(err) 
            returnFn({error: err, status: 400}); 
        else if(result)
            returnFn({data: result, status: 204});
        
        else returnFn({error: 'User not found', status: 404})
        
    });
}

exports.findAllUsers = function (returnFn){
    User.find({}, function(err, res){
        if(err)
            return returnFn({error: err, status:500});
        else if(res.length == 0){
            return returnFn({error: "No users found", status: 404});
        }
        returnFn({data: res, status: 200});
    });
}

exports.findUsersByRole = function (role, returnFn){
    User.find({role: role}, function(err, res){
        if(err){
            return returnFn({error: err, status: 500});
        }
        else if(res.length > 0){
            return returnFn({data: res, status: 200});
        }
        returnFn({error: 'No user found', status: 404});
        
    })
}

exports.insertUser = function (fullName, email, phoneNo, password, role, returnFn){
    bcrypt.hash(password, 10 , (err, hash)=>{
        if(err){
            returnFn({error: "No password field provided", status: 400});
        }
        else{
            let user = new User({fullName: fullName, email: email, phoneNo: phoneNo,password: hash, role: role});
            user.save((err, res)=>{
            if(err)
                return returnFn({error: err, status: 400});
            returnFn({data: res, status: 201});
            });
        }
    
    });
    
}

exports.updateAUser = function(id, newUser, returnFn){
    if(newUser.password != null || newUser.password != undefined){
       hashPassword(newUser.password, newUser, (updatedUser)=>{
            updateUser(id, updatedUser, (result)=>{
                returnFn(result);
            });
       })
    }
    else
        updateUser(id, newUser, (result)=>{
            returnFn(result);
        });

}

exports.loginUser = function(email, password, returnFn){
    User.find({email: email}, function(err, user){
        if(err)
            return returnFn({error: err, status: 500});
        else if(user.length){
            bcrypt.compare(password, user[0].password, function(err,res){
                if(!res)
                    return returnFn({error: "Invalid email or password", status: 400});
                else{
                    const token = jwt.sign(
                        user[0].toObject(), 
                        values.JWT_KEY,
                        {
                            expiresIn: '2h'
                        });
                    return returnFn({data: user[0], token: token, status: 200})
                }
            })
        }
        else{
            returnFn({error: "Invalid email or password", status: 400});
        }
    })
}

exports.blockUser = function(userId, returnFn){
    User.findByIdAndUpdate({_id: userId}, {status: 'Inactive'}, {new: true}, function(err, result){
        if(err)
            return returnFn({error: err, status: 500});
        else if(result)
            returnFn({data: result, status: 204});
        returnFn({error: "No user found", status: 404});
    })
}

exports.findUserById = function(id, returnFn){
    User.find({_id: id}, function(err, result){
        if(err)
            return returnFn({error: err, status: 400});
        else if(result.length)
            return returnFn({data: result[0], status: 200});
        returnFn({error: 'No user found', status: 404});
        
    })
}

exports.findUserByName = function(name, returnFn){
    User.find({fullName: {$regex:`^${name}`, $options:'i'}, role: 'receiver'}, function(err, result){
        if(err)
            return returnFn({error: err, status: 404});
        else if(result.length > 0)
            return returnFn({data: result, status: 200});
        returnFn({error: 'No user found', status: 404});
    })
}