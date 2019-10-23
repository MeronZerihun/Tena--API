var User = require('../models/User');
const bcrypt = require('bcrypt');

exports.findAllUsers = function (returnFn){
    User.find({}, function(err, res){
        if(err)
            return returnFn({error: err, status:500});
        else if(res.length == 0){
            return returnFn({error: "No users found", status: 204});
        }
        returnFn({success: res, status: 200});
    });
}

exports.findUsersByRole = function (role, returnFn){
    User.find({role: role}, function(err, res){
        if(err){
            return returnFn({error: err, status: 500});
        }
        else if(res.length > 0){
            return returnFn({success: res, status: 200});
        }
        returnFn({error: 'No user found', status: 204});
        
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
            returnFn({success: res, status: 201});
            });
        }
    
    });
    
}

exports.updateAUser = function(id, newUser, returnFn){
    User.findByIdAndUpdate({_id: id}, newUser,{new: true}, function(err, result){
        if(err) 
            return returnFn({error: err, status: 400}); 
        else if(result)
            return returnFn({success: result, status: 200});
        
    });

}

exports.loginUser = function(email, password, returnFn){
    User.find({email: email}, function(err, user){
        if(err)
            return returnFn({error: err, status: 500});
        else if(user.length){
            //console.log(user)
            console.log(user[0].password);
            bcrypt.compare(password, user[0].password, function(err,res){
                if(!res)
                    return returnFn({error: "Invalid email or password", status: 400});
                else{
                    return returnFn({success: user[0], status: 200})
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
            returnFn({success: result, status: 200});
        returnFn({error: "No user found", status: 400});
    })
}

exports.findUserById = function(id, returnFn){
    User.findById(id, function(err, result){
        if(err)
            return returnFn({error: err, status: 500});
        else if(result)
            return returnFn({success: result, status: 200});
        returnFn({error: 'No user found', status: 400});
        
    })
}

exports.findUserByName = function(name, returnFn){
    User.find({fullName: {$regex:`${name}`, $options:'i'}, role: 'receiver'}, function(err, result){
        if(err)
            return returnFn({error: err});
        else if(result.length > 0)
            return returnFn(result);
        returnFn({error: 'No user found'});
    })
}