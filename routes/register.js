var router = require('express').Router();

var User = require('../models/user');

router.post('/', function(request, response) {
  console.log(request.body);
  User.create(request.body, function(err) {
    if (err) {
      console.log(err);
      response.sendStatus(500);
    } else {
      response.redirect('/');
    }
  });
});

module.exports = router;
