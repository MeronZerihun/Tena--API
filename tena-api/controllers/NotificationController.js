const NotificationService = require('../services/NotificationService');

exports.getNotifications = function(req, res, next){
    NotificationService.getNotifications((results)=>{
        if(results.length)
            res.status(results[0].status).json(results);
        else{
            res.status(results.status).json(results);
        }
    })
}