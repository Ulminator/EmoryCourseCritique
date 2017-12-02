const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const passport = require('passport');
const mongoose = require('mongoose');
//const key=require('./config/keys')
const bodyParser = require('body-parser');
const flash=require('connect-flash');
const nev=require('email-verification')(mongoose);
const nodemailer=require('nodemailer')
var transport=nodemailer.createTransport({
  service:'Gmail',
  auth:{
    'user':"emorycoursecritique@gmail.com",
     pass:'coursecritique1'
  }
})


mongoose.connect(process.env.MONGODB_URI);
app.set('views',__dirname+'/frontend');
app.set('view engine','ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(require('cookie-parser')());
app.use(require('express-session')({
   secret: 'keyboard cat',
   resave: false,
   saveUninitialized: false,
   cookie:{maxAge:30*60*1000}}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
app.use(express.static(path.join(__dirname, 'public')));

require('./config/nev.js')(nev);
require('./config/passport.js')(passport);
require('./backend/appRoutes')(app,passport,nev,transport);


app.get('*', (request, response) => {
    response.sendFile(__dirname + '/public/index.html'); // For React/Redux
});

// app.use(function(err,req,res,next){
//   if(err.status&&err.status>100&err.status<500){
//     res.status(err.status)
//   }
//   else{
//     res.status(500)
//   }
//   res.json({error:{
//     error:err,
//     message:err.message,
//     stack:err.stack
//   }})
// })
app.listen(PORT, error => {
    error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
