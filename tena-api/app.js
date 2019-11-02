var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var CORS = require('cors');


var allowedOrigins = require('./config/values').origins;
var usersRouter = require('./routes/users');
var banksRouter = require('./routes/banks');
var requestsRouter = require('./routes/requests');
var offersRouter = require('./routes/offers');
var notificationsRouter = require('./routes/notifications');

var app = express();
var dbConnect = require('./config/connectDb');


//var seedData = require('./config/seedData');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var seedData = require('./config/seedData');


app.use(CORS({origin: (origin,callback)=>{
  if(!origin)
    return callback(null, true);
  if(allowedOrigins.indexOf(origin) === -1){
    var message = "The policy of this site doesn't allow the specified origin" ;
    return callback(new Error(message), false);
  }
  return callback(null, true);
}}))

app.use('/users', usersRouter);
app.use('/banks', banksRouter);
app.use('/requests', requestsRouter);
app.use('/offers',offersRouter);
app.use('/notifications', notificationsRouter);

app.use('/tena-uploads', express.static('tena-uploads'));

app.get('*', function(req,res){
  res.status(404).json({error: 'this route is not defined'});
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {error: 'this route is not defined'};

  // render the error page
  res.status(err.status || 500).json({error: 'this route is not defined'});
  //res.render('error');
});



module.exports = app;
