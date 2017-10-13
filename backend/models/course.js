const mongoose = require('mongoose');
var {Schema}=mongoose;

var courseSchema=new Schema({
    course_num: String,
    course_name: String,
    description: String,
    dept: String,
    credits: Number,
    ger: String,
    opus_id: String,
    ratings:[{type: Schema.Types.ObjectId,ref:'rating'}],
    professors:[String],
},{collection:'courses'}
);

courseSchema.plugin(require('mongoose-keywords'), {paths: ['course_num', 'course_name', 'opus_id']});

module.exports = mongoose.model('course',courseSchema);
