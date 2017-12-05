const path = require('path');
var User=require(path.join(__dirname,'..','/models/Users.js'));
var critique=require(path.join(__dirname,'..','/models/critique.js'));

module.exports = function(req,res,next,upvote){
  let critique_id=req.body.critique_id
  let user_id=req.user

  if(!user_id){
    res.status(401)
    return res.json({message:"Must login to vote"})
  }
  critique.findOne({_id:critique_id},function(err,this_critique){
    if(err){
      return next(err)
    }
    if(upvote){
      addUpvote(this_critique,user_id,critique_id,res,next,callback)
    }
    else{
      addDownvote(this_critique,user_id,critique_id,res,next,callback)
    }

  })

};
function addUpvote(this_critique,user_id,critique_id,res,next,callback){
  User.findOne({_id:user_id},function(err,user){
  if(err){
    return next(err)
  }
  if(user.upvoted.includes(critique_id)){
    this_critique.upvotes--;
    user.upvoted.remove(critique_id)
  }
  else{
    if(user.downvoted.includes(critique_id)){
      this_critique.downvotes--;
      user.downvoted.remove(critique_id)
    }
    this_critique.upvotes++;
    user.upvoted.push(critique_id)
  }
  user.save();
  this_critique.save();
  callback(res,{upvotes:this_critique.upvotes,downvotes:this_critique.downvotes})
})
}

function addDownvote(this_critique,user_id,critique_id,res,next,callback){
  User.findOne({_id:user_id},function(err,user){
  if(err){
    return next(err)
  }
  console.log(user);
  if(user.downvoted.includes(critique_id)){
    this_critique.downvotes--;
    user.downvoted.remove(critique_id)
  }
  else{
    if(user.upvoted.includes(critique_id)){
      this_critique.upvotes--;
      user.upvoted.remove(critique_id)
    }
    this_critique.downvotes++;
    user.downvoted.push(critique_id)
  }
  console.log(this_critique);
  user.save();
  this_critique.save();
  callback(res,{upvotes:this_critique.upvotes,downvotes:this_critique.downvotes})
})
}


function callback(res,info){
  return res.json(info)
}
