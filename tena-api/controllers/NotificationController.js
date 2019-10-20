const NotificationService = require('../services/NotificationService');

exports.getNotifications = function(req, res, next){
    NotificationService.getNotifications((results)=>{
        res.status(res.statusCode).json(results);
    })
}