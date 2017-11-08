const mongoose = require('mongoose');
var {Schema}=mongoose;

var ratingSchema=new Schema({
  class_id:{type:String,required:true},
  prof_id:{type:String,required:true},
  rating_count: Number,
  total_difficulty:Number,
  total_overall:Number,
  total_workload:Number,
  ratings: [{difficulty:Number, overall: Number, workload:Number,comment:String,rated_date:Date}]
})

 module.exports =  mongoose.model('rating',ratingSchema);
