const NotificationService = require('../services/NotificationService');

exports.getNotifications = function(req, res, next){
    NotificationService.getNotifications((results)=>{
        res.status(results.status).json(results);
    })
}