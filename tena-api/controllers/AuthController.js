const jwt = require('jsonwebtoken');
const values = require('../config/values');

// Authorization: Bearer <token>
exports.verifyToken = function(req, res, next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        jwt.verify(token, values.JWT_KEY, (err, AuthData)=>{
            if(err){
                res.sendStatus(403);
            }
            else{
                req.userId = AuthData._id;
                next();
            }
        })
        

    }
    else{
        res.sendStatus(403)
    }
}