var User = require('../models/User');

exports.findAllUsers = function (){
    User.find({}, function(err, res){
        if(err){
            return err;
        }
        return res;
    });
}


//module.exports = findAllUsers;