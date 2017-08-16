var router = require('express').Router();
var passport = require('passport');

router.get('/', function(req, res) {
  res.send(req.isAuthenticated());
});

router.get('/passportSuccess', function(req, res){
  res.sendStatus(200);
});

router.get('/passportFailure', function(req, res){
  res.sendStatus(401);
});

router.get('/hello', function(req, res) {
  if (req.user) {
    console.log(req.user);
      res.send(req.user);
  }
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/login/passportSuccess',
  failureRedirect: '/login/passportFailure'
}));

module.exports = router;
