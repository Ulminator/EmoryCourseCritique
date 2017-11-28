var mongoose=require('mongoose');
var {Schema}=mongoose;

var bcrypt=require('bcrypt-nodejs');

var userSchema= new Schema({
  email:String,
  password:String,
  comments:[String],
  rated_classes:[{professor:String, course: String}],
  resetPasswordToken:String,
  resetPasswordExpires:Date,
  upvoted:[String],
  downvoted:[String]
});

userSchema.methods.storeHashedPassword=function(password){
    this.password=bcrypt.hashSync(password, bcrypt.genSaltSync(8)); //hash and store password
};

userSchema.methods.validPassword=function(password){
  return bcrypt.compareSync(password, this.password); //compare passwords
};

module.exports = mongoose.model('user',userSchema);
