const path = require('path');
var querymen = require('querymen');

module.exports = function(app,passport,nev,transport){
   app.use('/users',require('connect-ensure-login').ensureLoggedIn('/login'))


  app.post('/account/signup',(req,res,next)=>{
    require('./service/signup.js')(req,res,nev,next)
  })

  app.post('/account/login',passport.authenticate('local-login',
    {
      successReturnToOrRedirect:'/users/currentUser',
      } //if there is a return to then return ,else go to home page
  ));

  app.get('/users/currentUser',
  (req,res)=>{
    console.log(req.isAuthenticated());
    res.json({user:req.session.passport.user})

  }) //middleware to ensure login

  app.get('/account/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
  })

  app.get('/account/verification/:URL',function(req,res,next){
    var url=req.params.URL;
    nev.confirmTempUser(url,function(err,user){
      if(err){
        // return res.status(404).send({message:"confirming temp user failed"})
        return next(err)
      }
      if(user){
          req.login(user,function(err){
            if(err){
              return next(err)
            }
            res.redirect('/users/currentUser')
          })

      }
      else{
        res.json({errormessage:"could not find this user"})
      }

    })
  })

    // Get course page when clicked in search
    app.get('/course', querymen.middleware({
        course: {type: String, paths: ['course']}
    }), function(req, res) {
        require('./service/get_course.js')(res, req.querymen.query);
    });

    // Add a rating to a course
    app.post('/course/add_rating', (req,res)=>{
        require('./service/add_rating.js')(req,res)
    })
  
  app.post('/account/resend-verification',function(req,res,next){
    var email=req.body.email;
    nev.resendVerificationEmail(email,function(err,userFound){
      if(err){
        // return res.status(404).send("ERROR:sending email failed")
        return next(err)
      }
      if(userFound){
        res.json({message:"another verification email has just been sent"})
      }
      else{
        res.json({message:"verification code expired, please sign up again"})
      }
    })
  })

  app.post('/account/forgot',(req,res,next)=>{
    require('./service/forgotPass.js')(req,res,next,transport)
  })

  app.post('/account/reset/:token',(req,res,next)=>{
    require('./service/resetPass.js')(req,res,next)
  })


};
