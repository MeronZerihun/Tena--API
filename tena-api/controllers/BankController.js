const BankService = require('../services/BankService');

exports.debit = function(req, res, next){
    var bankRequest = req.body;
    BankService.debitAmount(bankRequest.amount, bankRequest.accountNumber,(result)=>{
        res.status(res.statusCode).json(result);
    });
}