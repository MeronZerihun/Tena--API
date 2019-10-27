const Bank = require('../models/Bank');

function updateAdminAccount(amount, res, returnFn){
    Bank.find({accountNumber: '8238968969'}, function(err, adminAcc){
        if(err){
            return returnFn({error: err, status: 500});
        }
        else if(adminAcc.length > 0){
            Bank.findByIdAndUpdate(adminAcc[0]._id,{deposit: adminAcc[0].deposit + amount},(err, newAcc)=>{
                if(err)
                    returnFn({error: err, status: 500});
                else if(newAcc)
                    returnFn({data: res, status: 200});
            })
        }
        else
            returnFn({message: 'No such bank account found', status: 404})
    })
}

function updateUserAccount(bank, amount, returnFn){
    if(bank.deposit < amount)
        return returnFn({error: 'Insufficient deposit', status: 400});
    else{
        Bank.findByIdAndUpdate(bank._id, { deposit: bank.deposit - amount}, {new: true}, function(err, res){
            if(err)
                return returnFn({error: err, status: 500});
            else
                updateAdminAccount(amount, res,(result)=>{
                    returnFn(result)
                });
        })
    }
}

exports.addBank = function(type, amount, account, returnFn){
    let bank = new Bank({type: type, accountNumber: account, deposit: amount});
    bank.save(function(err, newBank){
        if(err)
            return returnFn({error: err, status: 400});
        returnFn({data: newBank, status: 201});
    })
}

exports.debitAmount = function(type, amount, account, returnFn){
    Bank.find({accountNumber: account, type: type}, function(err, result){
        console.log(result)
        if(err)
            return returnFn({error: err, status: 500});
        else if(result.length > 0){
            updateUserAccount(result[0], amount,(userResult)=>{
                returnFn(userResult);
            });
        }
        else{
            returnFn({error:'No such bank account found', status: 400});
        }
    })
}

exports.showAdminAccount = function(returnFn){
    Bank.find({accountNumber: '8238968969'}, function(err, adminAcc){
        if(err)
            return returnFn({error: err, status: 404});
        else    
            returnFn({data: adminAcc, status: 200});
    })
}