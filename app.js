require('dotenv').config({ path: './config.env' });
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dbo = require('./db/conn');
var cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./middleware/passport');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const auth = require('./routes/auth');
const googleSuccess = require('./routes/googleSucess')

var app = express();  

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/api/v1/auth', auth);
app.get("/failed", (req, res) => {
  res.send("Failed")
})
app.use("/success", googleSuccess);

app.get('/google',
  passport.authenticate('google', {
          scope:
              ['email', 'profile']
      }
  ));

app.get('/google/callback',
  passport.authenticate('google', {
      failureRedirect: '/failed',
  }),
  function (req, res) {
    res.redirect('/success')
  }
);



// catch 404 and forward to error handler

app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 600);
  res.render('error');
});





module.exports = app;
