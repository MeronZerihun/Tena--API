const Bank = require('../models/Bank');

exports.debitAmount = function(amount, account, returnFn){
    Bank.find({accountNumber: account}, function(err, result){
        if(err)
            return returnFn(err);
        else{
            console.log(result)
            if(result[0].deposit < amount)
                return returnFn({error: 'Insufficient deposit'});
            else{
                Bank.findByIdAndUpdate(result[0].id, { deposit: result[0].deposit - amount}, {new: true}, function(err, res){
                    if(err)
                        return returnFn(err);
                    else
                        console.log('Result:'+ res);
                        returnFn(res);
                })
            }
        }

    })
    
}