const mongoose = require('mongoose');
var {Schema}=mongoose;

var ratingSchema=new Schema({
  class_id:{type:Schema.Types.ObjectId, required:true},
  prof_id:{type:Schema.Types.ObjectId,required:true},
  rating_count: Number,
  total_difficulty:Number,
  total_overall:Number,
  total_workload:Number,
  ratings: [{difficulty:Number, overall: Number, workload:Number,comment:String}]
})

 module.exports =  mongoose.model('rating',ratingSchema);
