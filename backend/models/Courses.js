var mongoose=require('mongoose');
var {Schema}=mongoose;
var Rating=require('Ratings.js');
var Professor=require('Professors.js');

var courseSchema = new Schema({
  name:String,
  id:String,
  ratings:[Rating],
  professors:[Professor],
});

module.exports = mongoose.model('Course',courseSchema);
