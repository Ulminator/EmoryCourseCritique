const mongoose = require('mongoose');
var {Schema}=mongoose;

var ratingSchema=new Schema({
  class_id:{type:String,required:true},
  prof_id:{type:String,required:true},
  rating_count: Number,
  total_difficulty:Number,
  total_overall:Number,
  total_workload:Number,
  ratings: [{type:Schema.Types.ObjectId, ref: 'critique'}]
})
var deepPopulate = require('mongoose-deep-populate')(mongoose);
ratingSchema.plugin(deepPopulate);
 module.exports =  mongoose.model('rating',ratingSchema);
