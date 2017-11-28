  const path = require('path');
const async = require('async');
var Rating=require(path.join(__dirname,'..','/models/ratings.js'));
var Professor=require(path.join(__dirname,'..','/models/professor.js'));
var Course=require(path.join(__dirname,'..','/models/course.js'));
var User=require(path.join(__dirname,'..','/models/Users.js'));
var critique=require(path.join(__dirname,'..','/models/critique.js'));
const mongoose = require('mongoose');

module.exports = function(req,res,next){
    var class_id = req.body.class_id;
    var prof_id = req.body.prof_id;
    var difficulty_rating = req.body.difficulty_rating;
    var overall_rating = req.body.overall_rating;
    var workload_rating = req.body.workload_rating;
    var comment = req.body.comment;

    var user_id=(req.user);
    if(!user_id){
      res.status(401)
      return res.json({message:"user is not authenticated"})
    }

    function checkUser(user_id,done){
      User.findOne({'_id':user_id,'rated_classes.course': class_id, 'rated_classes.professor': prof_id},function(err,user){
        if(err){
          return next(err)
        }
        if(user){
          return res.json({message:"This user has already rated this course"})
        }
        else{
          done(null,user_id)
        }
      })
    }

    function updateRating(user_id, done){Rating.findOne({'class_id': class_id, 'prof_id': prof_id}, function(err, this_rating) {
        var this_critique=new critique({
          difficulty: Number(difficulty_rating),
          overall: Number(overall_rating),
          workload: Number(workload_rating),
          comment: comment,
          rated_date:new Date(),
          upvotes:0,
          downvotes:0
          });
        if (this_rating) {
            // Rating already exists
                if (err) {
                  return next(err);
                    // Rating findOne error
                } else {
                    this_rating.rating_count++;
                    this_rating.total_workload+=workload_rating;
                    this_rating.total_overall+=overall_rating;
                    this_rating.total_difficulty+=difficulty_rating;
                    this_critique.save();
                    this_rating.ratings.push(new mongoose.mongo.ObjectId(this_critique._id));
                    this_rating.save();
                    done(null, user_id)
                    // Add rating to professor
                }
        } else {
            // Rating doesn't exist
            var new_rating = new Rating({
                class_id: class_id,
                prof_id: prof_id,
                rating_count: 1,
                total_workload:workload_rating,
                total_overall:overall_rating,
                total_difficulty:difficulty_rating
                });
            this_critique.save();
            new_rating.ratings.push(new mongoose.mongo.ObjectId(this_critique._id));
            new_rating.save(function(err){
            // Add rating to professor
            if(err){
              return next(err)
            }
            Professor.findOne({name:prof_id}, function(err, this_professor) {
                if (err) {
                  return next(err)
                    // Professor findOne error
                } else {
                    this_professor.ratings.push(new_rating._id);
                    this_professor.save();
                }
            });
            Course.findOne({"course_num": class_id}, function(err, this_course) {
                if (err) {
                  return next(err)
                    // Professor findOne error
                } else {
                    this_course.ratings.push(new_rating._id);
                    this_course.save();
                }
            });
          });
          done(null, user_id)
        }
    })};
    function updateUser(user_id,done){User.findOne({"_id":user_id},function(err,user){
      user.rated_classes.push({course:class_id,professor:prof_id});
      user.comments.push(comment)
      user.save();
      done(null,user_id)
    })}

    async.waterfall([(done)=>(done(null,user_id)),
      checkUser,
      updateRating,
      updateUser,
      (err,id)=>{return res.json({"message":"success"})}
    ]);
};
