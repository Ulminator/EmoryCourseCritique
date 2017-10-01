const mongoose = require('mongoose');
var {Schema}=mongoose;

var ratingSchema=new Schema({
  class_id:{type:Schema.Types.ObjectId, required:true},
  prof_id:{type:Schema.Types.ObjectId,required:true},
  rating_count: Number,
  ratings[{difficulty:Number, overall: Number, workload:Number,comment:String}]
})

ratingSchema.methods.addRating=function(json_resp) {
    var rating = JSON.parse(json_resp);
    this.rating_count++;
    this.ratings.push({
        difficulty: Number(rating.difficulty),
        overall: Number(rating.overall),
        workload: Number(rating.workload),
        comment: String(rating.comment),
    });
};

 module.exports =  mongoose.model('rating',ratingSchema);
