var User = require('../models/User');
const bcrypt = require('bcrypt');

exports.findAllUsers = function (returnFn){
    User.find({}, function(err, res){
        if(err)
            return returnFn({error: err, status:500});
        else if(res.length == 0){
            return returnFn({message: "No users found", status: 200});
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
        returnFn({message: 'No user found', status: 404});
        
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
    User.findByIdAndUpdate({_id: id}, newUser,{new: true}, function(err, result){
        if(err) 
            return returnFn({error: err, status: 400}); 
        else if(result)
            return returnFn({data: result, status: 200});
        
    });

}

exports.loginUser = function(email, password, returnFn){
    User.find({email: email}, function(err, user){
        if(err)
            return returnFn({error: err, status: 500});
        else if(user.length){
            bcrypt.compare(password, user[0].password, function(err,res){
                if(!res)
                    return returnFn({message: "Invalid email or password", status: 400});
                else{
                    return returnFn({data: user[0], status: 200})
                }
            })
        }
        else{
            returnFn({message: "Invalid email or password", status: 400});
        }
    })
}

exports.blockUser = function(userId, returnFn){
    User.findByIdAndUpdate({_id: userId}, {status: 'Inactive'}, {new: true}, function(err, result){
        if(err)
            return returnFn({error: err, status: 500});
        else if(result)
            returnFn({data: result, status: 200});
        returnFn({message: "No user found", status: 400});
    })
}

exports.findUserById = function(id, returnFn){
    User.find({_id: id}, function(err, result){
        if(err)
            return returnFn({error: err, status: 500});
        else if(result)
            return returnFn({data: result[0], status: 200});
        returnFn({message: 'No user found', status: 400});
        
    })
}

exports.findUserByName = function(name, returnFn){
    User.find({fullName: {$regex:`^${name}`, $options:'i'}, role: 'receiver'}, function(err, result){
        if(err)
            return returnFn({error: err, status: 404});
        else if(result.length > 0)
            return returnFn({data: result, status: 200});
        returnFn({message: 'No user found', status: 404});
    })
}