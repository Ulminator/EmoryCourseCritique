const path = require('path');
const async = require('async');
var crypto=require('crypto');
var User=require(path.join(__dirname,'..','models/Users.js'));

module.exports = function(req,res,next,transport){

  async.waterfall([
    function(done){

      console.log(req.headers.host);
      crypto.randomBytes(20,function(err,buf){
        var token=buf.toString('hex')
        done(err,token)
      })
    },
    function(token,done){
        var email=req.body.email
        User.findOne({email:email},function(err,user){
          if(!user){
            return res.json({message:"no user with this email!"})
          }
          user.resetPasswordToken=token,
          user.resetPasswordExpires =Date.now()+360000
          user.save(err=>done(err,user,token))
        })
    },
    function(user,token,done){
      var mailOptions={
        from: "Do Not Reply <emorycoursecritique@gmail.com>",
        to:user.email,
        subject:"Password Reset",
        text:'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/account/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      }
      transport.sendMail(mailOptions,function(err){
        if(!err){
          res.json({'message':'an email has been sent to '+mailOptions.to})
        }
        done(err)
      })
    }
  ],function(err){
    if(err){
      return next(err);
    }
    res.json({message:'all done'})
  })
};
