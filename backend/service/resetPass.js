const bcrypt=require('bcrypt-nodejs');
const path = require('path');
var User=require(path.join(__dirname,'..','models/Users.js'));



module.exports = function(req,res,next){
  var password=req.body.password;
  var token=req.params.token;
  User.findOne({resetPasswordToken:token,resetPasswordExpires:{$gt:Date.now()}},function(err,user){
    if(err){
      return next(err)
    }
    user.password=bcrypt.hashSync(password,bcrypt.genSaltSync(8));
    user.resetPasswordToken=undefined;
    user.resetPasswordExpires=undefined;
    user.save(function(err){
      req.login(user,function(err){
        if(err){
          return next(err)
        }
        res.redirect('/')

      })
    })
  })

};
