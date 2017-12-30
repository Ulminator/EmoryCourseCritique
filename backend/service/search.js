const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Course = require(path.join(__dirname,'..','/models/course.js'));
var Rating = require(path.join(__dirname,'..','/models/ratings.js'));
var Professor = require(path.join(__dirname,'..','/models/professor.js'));

module.exports = function(req, res,next) {
    var query = req.querymen;

    // WARNING: MESSING WITH DB Iterate through all courses and add keywords -- only run once
    /*
    Course.find().then(function(courses) {
        courses.forEach(function(course) {
            var new_course = new Course({
                course_num: course.course_num,
                course_name: course.course_name,
                dept: course.dept,
                credits: course.credits,
                ger: course.ger,
                opus_id: course.opus_id,
                professors: course.professors,
                description: course.description,
                ratings:course.ratings,
            });
            Course.remove({_id: course.id}, function(err) {

            });
            new_course.save();
        });
        res.json();
    });

    */
    //WARNING: MESSING WITH DB iterate through all courses and add course_num+course_name keyword -- only run once
    /*
    Course.find().then(function(courses) {
      courses.forEach(function(course) {
        console.log(course.keywords[2]+' '+course.keywords[1]);
        course.keywords.push(course.keywords[2]+' '+course.keywords[1]);
        console.log(course.keywords);
        course.save();
      });
    });*/
    
    //WARNING: MESSING WITH DB
    /*Professor.find().then(function(courses) {
      courses.forEach(function(course) {

        prof_name=course.name.replace(',','');
        course.keywords.push(prof_name);
        course.keywords.shift();
        console.log(course.keywords);
        course.save();
      });
    });*/

    //new and improved query
    var all={
            courses:[],
            profs:[]
        };
    var profQuery={keywords:query.query.keywords};
    console.log(query);
    console.log(query.cursor);
    /*if(query.cursor.filter)
    {
        query.query.dept= query.cursor.filter;
    }*/
    var sort;
    if(query.cursor.sort.overall===1)
        sort={ "$sort": { "course_avg_overall": -1 } };
    else
        sort={"$limit": 40}

    if(query.query.course_num)
    {
        if(query.query.course_num.$in)
        {
            for(var i=0;i<query.query.course_num.$in.length;i++)
            {
                query.query.course_num.$in[i]=new RegExp("^[A-Z]*"+query.query.course_num.$in[i]);
            }
        }
        else
            query.query.course_num=new RegExp("^[A-Z]*"+query.query.course_num);
    }


    console.log(query.query);


    Course.aggregate([
        {"$match": query.query},

        
        {"$project": {
            "course_num": 1,
            "course_name": 1,
            "ratings":1,
            "weight": {
                "$add": [
                { "$cond": {
                  "if": { "$eq": [0,{"$indexOfCP": [ "$course_num", query.query.keywords.source.toUpperCase() ]}] }, 
                  "then": 1,
                  "else": 0
                }}
              ] 
          }
        }},

        { "$sort": { "weight": -1 } },
        {"$limit": 40},

        {"$lookup": {
            "from": "ratings",
            "localField": "ratings",
            "foreignField": "_id",
            "as": "ratings"
        }},

        {"$project": {
            "course_num": 1,
            "course_name": 1,
            "sections": {"$map": {
                input:"$ratings",
                as:"rating",
                in: {
                    "section_name": "$$rating.prof_id",
                    "average_overall": {"$cond": [ {"$eq": [ "$$rating.rating_count", 0 ] }, "N/A", {"$divide": ["$$rating.total_overall", "$$rating.rating_count"]} ]}
                }
            }}
            
        }},


        {"$addFields": {
            "course_avg_overall": {"$avg": "$sections.average_overall"}
        }},
        sort

        ]).exec((err, courses) => {
            if (err) throw err;
            console.log(courses);
            all.courses=courses;
            
        })
    .finally(function() {

    Professor.aggregate([
        {"$match":profQuery},
        {"$limit":20},
        {"$lookup": {
            "from": "ratings",
            "localField": "ratings",
            "foreignField": "_id",
            "as": "ratings"
        }},
        {"$project": {
            "professor": "$name",
            "sections": {"$map": {
                input:"$ratings",
                as:"rating",
                in: {
                    "section_name": "$$rating.class_id",
                    "average_overall": {"$cond": [ {"$eq": [ "$$rating.rating_count", 0 ] }, "N/A", {"$divide": ["$$rating.total_overall", "$$rating.rating_count"]} ]}
                }
            }}

        }},


        {"$addFields": {
            "course_avg_overall": {"$avg": "$sections.average_overall"}
        }},
        sort

        ]).exec((err, profs) => {
            if (err) throw err;
            console.log(profs);
            all.profs=profs;
            
        })
        .finally(function(){
        return res.end(JSON.stringify(all));
    });
    })
    
    

    //old query
    /*
    var all={
            courses:[],
            profs:[]
        }
    var course_resp=[];
    var prof_resp=[];
    var sendCount=0;
    console.log(query);
    console.log(query.query);
    console.log(query.query.keywords=="cs 323");
    Course.find(query.query, query.select, query.cursor).lean().then(function(courses) {

        var count=courses.length;
        if(count===0)
        {
            sendCount++;
            console.log("NO COURSES");
            sendJson(null,false);
        }

        // Iterate thrugh courses
        courses.forEach(function(courseItem) {
            var numSections = courseItem.ratings.length;
            var numRating = numSections;
            var total_overall=0;
            var total_difficulty=0;
            var total_workload=0;
            var this_sections=[];
            if(courseItem.ratings.length===0)
            {
                numSections++;
                sendcsection(null,false);
            }
            // Iterate through each professor in each course
            courseItem.ratings.forEach(function(ratingID) {

                // Find matching professor
                
                        Rating.find({'_id': ratingID}, function(err, rating) {
                            if(err){
                              return next(err)
                            }
                            if (!rating[0]) {
                                // error finding a rating
                                
                                sendcsection(null,false);
                                console.log(ratingID);



                            } else {
                                var rating=rating[0];
                                var course_professor_rating = {
                                    section_name: rating.prof_id,
                                    average_difficulty: (rating.total_difficulty / rating.rating_count).toFixed(2),
                                    average_overall: (rating.total_overall / rating.rating_count).toFixed(2),
                                    average_workload: (rating.total_workload / rating.rating_count).toFixed(2)
                                }
                                // add card to response
                                sendcsection(course_professor_rating,rating.rating_count!=0);
                            }

                        }).lean().limit(1);



            });

            function sendcsection(send,add) {
                if(add)
                {
                    total_overall+=Number(send.average_overall);
                    total_workload+=Number(send.average_workload);
                    total_difficulty+=Number(send.average_difficulty);
                    console.log(total_overall);
                }
                else
                {
                    numRating--;
                }
            if(send)
                this_sections.push(send);
            

            numSections--;

            if(numSections==0)
            {
               //console.log(numRating);
               //console.log(total_overall);
               //console.log((total_overall/numRating).toFixed(2));
               courseJson(courseItem.course_num, courseItem.course_name,(total_overall/numRating).toFixed(2), (total_workload/numRating).toFixed(2), (total_difficulty/numRating).toFixed(2), this_sections);
            }
                        
        }

        });

        // Pass data to sendJson
        function courseJson(course_num, course_name, overall,workload,difficulty,sections) {
            //console.log(overall);
            var course={
                            course_num: course_num,
                            course_name: course_name,
                            course_avg_overall: overall,
                            course_avg_difficulty: difficulty,
                            course_avg_workload: workload,
                            sections: sections
                        }
            course_resp.push(course);
            count--;
            if(count==0)
            {
                console.log("COUNT IS 0");
                console.log(course_resp);
                sendCount++;
                sendJson(course_resp, false);
            }
        }

    

    Professor.find(query.query, query.select, query.cursor).lean().then(function(professors) {
        
        console.log("PROFESSORS");
        console.log(professors);
        var pcount=professors.length;
        if(pcount===0)
        {
            console.log("NO PROFS");
            sendCount++;
            sendJson(null,true);
        }
        
        
        // Iterate thrugh courses
        professors.forEach(function(prof) {
            var numSections = prof.ratings.length;
            var numRating = numSections;
            var total_overall=0;
            var total_difficulty=0;
            var total_workload=0;
            var this_sections=[];
            // Iterate through each professor in each course
            prof.ratings.forEach(function(ratingID) {

                // Find matching professor
                
                        Rating.find({'_id': ratingID}, function(err, rating) {
                            if(err){
                              return next(err)
                            }
                            if (!rating[0]) {
                                // error finding a rating
                                
                                console.log(ratingID);


                            } else {
                                var rating=rating[0];
                                var course_professor_rating = {
                                    section_name: rating.class_id,
                                    average_difficulty: (rating.total_difficulty / rating.rating_count).toFixed(2),
                                    average_overall: (rating.total_overall / rating.rating_count).toFixed(2),
                                    average_workload: (rating.total_workload / rating.rating_count).toFixed(2)
                                }
                                // add card to response
                                sendpsection(course_professor_rating,rating.rating_count!=0);
                            }

                        }).lean().limit(1);



            });

            function sendpsection(send,add) {
                if(add)
                {
                    total_overall+=Number(send.average_overall);
                    total_workload+=Number(send.average_workload);
                    total_difficulty+=Number(send.average_difficulty);
                }
                else
                {
                    numRating--;
                }
                this_sections.push(send);
            numSections--;

            if(numSections==0)
            {
               console.log(numRating);
               console.log(total_overall);
               console.log((total_overall/numRating).toFixed(2));
               profJson(prof.name, (total_overall/numRating).toFixed(2), (total_workload/numRating).toFixed(2), (total_difficulty/numRating).toFixed(2), this_sections);
            }
                        
        }

        });

        // Pass data to sendJson
        function profJson(name, overall,workload,difficulty,sections) {
            console.log(overall);
            var course={
                            professor:name,
                            course_avg_overall: overall,
                            course_avg_difficulty: difficulty,
                            course_avg_workload: workload,
                            sections: sections
                        }
            prof_resp.push(course);
            pcount--;
            if(pcount==0)
            {
                sendCount++;
                sendJson(prof_resp,true)
            }
        }

    }); 
    }); 

    function sendJson(data, send){
        
        if(sendCount>1)
        {
            if(send)
                all.profs=data;
            else
                all.courses=data;
            console.log(all);
            return res.end(JSON.stringify(all));
        }
        else
        {
            if(send)
                all.profs=data;
            else
                all.courses=data;
            console.log(data);
            console.log("COURSES:");
            console.log(all);
        }
    } 
    
    //WARNING MESSING WITH DB make id's unique 
    /*
    Course.find().then(function(courses) {

        //var count=courses.length;

        
        // Iterate thrugh courses
        courses.forEach(function(courseItem) {
            var makeunique= courseItem.ratings;
            var flags = Object.create(null);
            var unique = [];
            var index;
            for (i = 0; i < makeunique.length; ++i) {
                console.log(makeunique[i]);
                if (!flags[makeunique[i]]) {
                    flags[makeunique[i]] = true;
                    unique.push(makeunique[i]);
                }
            }

            courseItem.set({ratings:unique});
            courseItem.save();


        });

        

    }); */

    //WARNING MESSING WITH DB old search query
    /*
    var this_resp = [];
    Course.find().then(function(courses) {

        var count=courses.length;
        
        
    	// Iterate thrugh courses
        courses.forEach(function(courseItem) {
            var numProf = courseItem.professors.length;
            var numRating = numProf;
            var total_overall=0;
            var total_difficulty=0;
            var total_workload=0;
            var this_sections=[];
        	// Iterate through each professor in each course
            courseItem.professors.forEach(function(profName) {

                // Find matching professor
                Professor.findOne({'name': profName}, function(err, professor) {
                    if (err) {
                        return next(err)
                        // error finding a professor
                    } else if (courseItem) {
                        // Find matching rating
                        Rating.findOne({'class_id': courseItem.course_num, 'prof_id': profName}, function(err, rating) {
                            if(err){
                              return next(err)
                            }
                            if (!rating) {
                                // error finding a rating
                                console.log(profName);
                                //prepopulate ratings, run once
                                var newRating = new Rating({
                                    class_id: courseItem.course_num,
                                    prof_id: profName,
                                    rating_count: 0,
                                    total_workload:0,
                                    total_overall:0,
                                    total_difficulty:0,
                                    ratings:[]
                                });
                                newRating.save(function(err){
                                // Add rating to professor
                                if(err){
                                  return next(err)
                                }

                                Professor.findOne({'name':profName}, function(err, this_professor) {
                                        if (err) {
                                          return next(err)
                                            // Professor findOne error
                                        } else {
                                            if(this_professor.ratings)
                                            {
                                                /*var found = this_professor.ratings.some(function (el) {
                                                    return el === rating._id;
                                                });
                                                //if(!(this_professor.ratings.includes(rating._id)))
                                                //{
                                                this_professor.ratings.push(newRating._id);
                                                this_professor.save();
                                                //}
                                            }
                                            else
                                            {
                                                var newArray= [];
                                                newArray.push(newRating._id);
                                                //var saveID=this_professor._id;
                                                /*var new_prof = new Professor({
                                                    name: this_professor.name,
                                                    ratings: newArray,
                                                });
                                                this_professor.set({ratings:newArray});
                                                this_professor.save();
                                                //Professor.remove({_id: course.id}, function(err) {

                                                //});
                                                //Professor.update({name:this_professor.name},)
                                                //new_prof.save();
                                            }
                                        }
                                    });
                                    Course.findOne({'course_num': courseItem.course_num}, function(err, this_course) {
                                        if (err) {
                                          return next(err)
                                            // Professor findOne error
                                        } else {
                                            this_course.ratings.push(newRating._id);
                                            this_course.save();
                                        }
                                    });
                                });

                                var course_professor_rating = {
                                    professor: profName,
                                    average_difficulty: null,
                                    average_overall: null,
                                    average_workload: null
                                }
                                // add card to response
                                sendcprof(course_professor_rating,false);


                            } else {
                            	console.log(profName);
                                var course_professor_rating = {
                                    professor: profName,
                                    average_difficulty: (rating.total_difficulty / rating.rating_count).toFixed(2),
                                    average_overall: (rating.total_overall / rating.rating_count).toFixed(2),
                                    average_workload: (rating.total_workload / rating.rating_count).toFixed(2)
                                }
                                /*Professor.findOne({'name':profName}, function(err, this_professor) {
                                        if (err) {
                                          return next(err)
                                            // Professor findOne error
                                        } else {
                                            if(this_professor.ratings)
                                            {
                                                if(!(this_professor.ratings.includes(rating._id)))
                                                {
                                                this_professor.ratings.push(rating._id);
                                                this_professor.save();
                                                }
                                            }
                                            else
                                            {
                                                var newArray= [];
                                                newArray.push(rating._id);
                                                var saveID=this_professor._id;
                                                var new_prof = new Professor({
                                                    name: this_professor.name,
                                                    ratings: newArray,
                                                });
                                                this_professor.set({ratings:newArray});
                                                this_professor.save();
                                                //Professor.remove({_id: course.id}, function(err) {

                                                //});
                                                //Professor.update({name:this_professor.name},)
                                                //new_prof.save();
                                            }
                                        }
                                    });
                                    Course.findOne({'course_num': courseItem.course_num}, function(err, this_course) {
                                        if (err) {
                                          return next(err)
                                            // Professor findOne error
                                        } else {
                                            if(rating._id)
                                            {
                                                if(!(this_course.ratings.includes(rating._id)))
                                                {
                                                this_course.ratings.push(rating._id);
                                                this_course.save();
                                                }
                                            }
                                            else
                                                console.log(rating);
                                        }
                                    });
                                // add card to response
                                sendcprof(course_professor_rating,true);
                            }

                        });

                    }
                });

            });

            function sendcprof(send,add) {
                if(add)
                {
                    total_overall+=send.average_overall;
                    total_workload+=send.average_workload;
                    total_difficulty+=send.average_difficulty;
                }
                else
                {
                    numRating--;
                }
            this_sections.push(send);
            numProf--;
            if(numProf==0)
            {
               console.log(numRating);
               console.log(total_overall);
               console.log((total_overall/numRating).toFixed(2));
               sendJson(courseItem.course_num, courseItem.course_name,(total_overall/numRating).toFixed(2), (total_workload/numRating).toFixed(2), (total_difficulty/numRating).toFixed(2), this_sections);
            }
                        
        }

        });

        // Pass data to sendJson
        function sendJson(course_num, course_name, overall,workload,difficulty,sections) {
            console.log(overall);
            var course={
                            course_num: course_num,
                            course_name: course_name,
                            course_avg_overall: overall,
                            course_avg_difficulty: difficulty,
                            course_avg_workload: workload,
                            sections: sections
                        }
            this_resp.push(course);
            count--;
            if(count==0)
            {
                return res.end(JSON.stringify(this_resp));
            }
        }

    }); */
    
    
}; 
