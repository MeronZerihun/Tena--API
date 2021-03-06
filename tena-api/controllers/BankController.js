const BankService = require('../services/BankService');

exports.debit = function(req, res, next){
    var bankRequest = req.body;
    BankService.debitAmount(bankRequest.type, bankRequest.amount, bankRequest.accountNumber,(result)=>{
        res.status(result.status).json(result);
    });
}

exports.showAdminAccount = function(req, res, next){
    BankService.showAdminAccount( (result) => {
        res.status(result.status).json(result);
    })
}