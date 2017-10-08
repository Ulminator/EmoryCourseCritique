const path = require('path');
var Rating=require(path.join(__dirname,'..','/models/ratings.js'));

module.exports = function(req,res){
    var class_id = req.body.class_id;
    var prof_id = req.body.prof_id;
    var difficulty_rating = req.body.difficulty_rating;
    var overall_rating = req.body.overall_rating;
    var workload_rating = req.body.workload_rating;
    var comment = req.body.comment;
    
    Rating.count({'class_id': class_id, 'prof_id': prof_id}, function(err, count) {
        if (count > 0) {
            // Rating already exists
            Rating.findOne({'class_id': class_id, 'prof_id': prof_id}, function(err, this_rating) {
                if (err) {
                    // findOne error
                } else {
                    this_rating.rating_count++;
                    this_rating.ratings.push({
                        difficulty: Number(difficulty_rating),
                        overall: Number(overall_rating),
                        workload: Number(workload_rating),
                        comment: comment,
                        });
                    this_rating.save();
                }
                res.json({message: "success"});
            });
        } else {
            // Rating doesn't exist
            console.log(class_id);
            var new_rating = new Rating({
                class_id: class_id,
                prof_id: prof_id,
                rating_count: 1,
                });
            new_rating.ratings.push({
                difficulty: Number(difficulty_rating),
                overall: Number(overall_rating),
                workload: Number(workload_rating),
                comment: comment
                });
            new_rating.save();
            res.json({message: "success"});
        }
    });
};
