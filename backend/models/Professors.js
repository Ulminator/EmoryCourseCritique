var mongoose=require('mongoose');
var {Schema}=mongoose;
var Rating=require('Ratings.js');
var Course=require('Courses.js');

var professorSchema = new Schema({
  name:String,
  ratings:[Rating],
  courses:[Course],
});

module.exports = mongoose.model('Professor', professorSchema);
