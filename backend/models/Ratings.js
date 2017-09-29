var mongoose=require('mongoose');
var {Schema}=mongoose;
var Professor=require('Professors.js');
var Course=require('Courses.js');

var ratingSchema = new Schema({
  course:Course,
  professor:Professor,
  date:Date,
  quality_rating:{type:Number, min:1, max:5},
  difficulty_rating:{type:Number, min:1, max:5},
  comment:String,
});

module.exports = mongoose.model('Rating', ratingSchema);
