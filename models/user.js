var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true}
});

 UserSchema.pre('save', function(next){
   var user = this;
   var SALT_WORK_FACTOR = 10;
   if(user.isModified('password')== false){
     return next();
   };
   bcrypt.hash(user.password, SALT_WORK_FACTOR, function(err, hash){
     if(err){
       console.log(err);
     }
     console.log('Hashed Password', hash);
     user.password = hash;
     return next();
   });
 })

UserSchema.methods.checkPassword = function(possiblePassword, callback){
  var user = this;

  bcrypt.compare(possiblePassword, user.password, function(err, isMatch){
    if(err){
      console.log(err);
      callback(err, isMatch);
    }else{
    console.log('isMatch', isMatch);
    callback(null, isMatch);
  };
  })
};

module.exports = mongoose.model('User', UserSchema);
