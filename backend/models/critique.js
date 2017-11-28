const mongoose = require('mongoose');
var {Schema}=mongoose;

var critiqueSchema=new Schema({
      difficulty:Number,
      overall: Number,
      workload:Number,
      comment:String,
      rated_date:Date,
      upvotes:Number,
      downvotes: Number
})

 module.exports =  mongoose.model('critique',critiqueSchema);
