const Bank = require('../models/Bank');

exports.debitAmount = function(type, amount, account, returnFn){
    Bank.find({accountNumber: account, type: type}, function(err, result){
        if(err)
            return returnFn({error: err});
        else{
            if(result[0].deposit < amount)
                return returnFn({error: 'Insufficient deposit'});
            else{
                Bank.findByIdAndUpdate(result[0].id, { deposit: result[0].deposit - amount}, {new: true}, function(err, res){
                    if(err)
                        return returnFn({error: err});
                    else{
                        Bank.find({accountNumber: '8238968969'}, function(err, adminAcc){
                            if(err){
                                return returnFn({error: err})
                            }
                            else if(adminAcc.length > 0){
                                Bank.findByIdAndUpdate(adminAcc[0]._id,{deposit: adminAcc[0].deposit + amount},(err, newAcc)=>{
                                    if(err)
                                        returnFn({error: err});
                                    else if(newAcc)
                                        returnFn(res)
                                    
                                })
                            }
                        })
                    }
                })
            }
        }

    })
    
}