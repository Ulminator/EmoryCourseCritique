const mongoose = require('mongoose');
var {Schema}=mongoose;

var professorSchema=new Schema({
  name:String,
  office:String,
  department:String,
  ratings:[{type: Schema.Types.ObjectId,ref:'rating'}]
})

professorSchema.plugin(require('mongoose-keywords'), {paths: ['name']});

module.exports = mongoose.model('professor',professorSchema);
