var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('./models/user');
var Game = require('./models/game')
var login = require('./routes/login');
var register = require('./routes/register');
// var newGame = require('./routes/game');
// var dashboard = require('./routes/dashboard');
// var update = require('./routes/update');

var mongoURI = "mongodb://localhost:27017/canasta";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
  console.log('Mongo error', err);
});

MongoDB.once('open', function(){
  console.log('Mongo conection opened');
});

var app = express();

app.use(session({
  secret: 'canasta',
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 60 * 60 * 1000, secure: false, httmOnly: false}
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password, done) {
  User.findOne({ username: username }, function(err, user){
    if (err) {
      throw err;
    }

    if (!user) {
      // didn't find a user with the same username
      return done(null, false);
    }

    user.checkPassword(password, function(err, isMatch){
      if (isMatch) {
        return done(null, user);
      } else {
        done(null, false);
      }
    });
  });
}));

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if (err) {
      return done(err);
    }

    done(null, user);
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/login', login);
app.use('/register', register);
// app.use('/game', newGame);
// app.use('/dashboard', dashboard);
// app.use('/update', update);

app.use('/api', function(req, res, next){
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(403);
  }
});

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'public/views/index.html'));
});

app.use(function(request, response) {
  response.sendFile(path.join(__dirname, 'public/views/index.html'));
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('Server listening on ' + server.address().port);
});
