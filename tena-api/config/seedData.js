const UserService = require('../services/UserService');
const OfferService = require('../services/OfferService');
const RequestService = require('../services/RequestService');
const BankService = require('../services/BankService');

// Provider
UserService.insertUser("Meron","abc@gmail.com","1234567","abcde","provider",(result)=>{
    console.log(result);
});
// Admin
UserService.insertUser("admin","tena-admin@gmail.com","1234567","abcde","admin",(result)=>{
    console.log(result);
});
// Receiver
UserService.insertUser("Abebe","abebe@gmail.com","1234567","abcde","receiver",(result)=>{
    console.log(result);
    RequestService.createRequest(10, "F" , 1000, "married" , "blablabla", "2019-10-20T10:16:04.632Z-tena_logo.jpg", "Cancer","2019-10-20T10:16:04.631Z-index.js",result._id,(result)=>{
        console.log(result);
    });
});

// Admin account
BankService.addBank("Express",12430,"8238968969",(result)=>{
    console.log(result);
});

BankService.addBank("Express",5940, "82389684769",(result)=>{
    console.log(result);
});

BankService.addBank("MasterCard", 5940, "12387896456",(result)=>{
    console.log(result);
});



