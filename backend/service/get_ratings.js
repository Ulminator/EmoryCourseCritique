const path = require('path');
var Rating=require(path.join(__dirname,'..','/models/ratings.js'));

module.exports = function(req,res){
    var class_id = req.body.class_id;
    var prof_id = req.body.prof_id;

    Rating.findOne({'class_id': class_id, 'prof_id': prof_id}, function(err, rating) {
        res.send(rating.ratings);
    });
};
