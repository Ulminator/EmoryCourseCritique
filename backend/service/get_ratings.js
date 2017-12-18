const path = require('path');
var Rating=require(path.join(__dirname,'..','/models/ratings.js'));
var critique=require(path.join(__dirname,'..','/models/critique.js'));

module.exports = function(res, query_string){
    //var class_id = req.body.class_id;
    //var prof_id = req.body.prof_id;
    console.log(query_string['course']);
    console.log(query_string['prof']);
    prof_id= query_string['prof'].replace("_",", ");

    Rating.findOne({class_id:query_string['course'],prof_id:prof_id}).deepPopulate('ratings').lean().exec(function(err,rating){
      console.log(rating);
      res.json(rating)
    })
};
