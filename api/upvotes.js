const express = require('express')
const Users = require('./database');
const uuid = require('uuid');
const helper = require('./helper');



const createUpvote = (req, res) => {
    const QuesTions = Users.quesTion;
    const user = Users.user;
    const meetup = Users.meeTup;
    
    const params = req.params.id;
 const found = QuesTions.some(question =>question.id=== parseInt(params))
    if(found){
        const updatedquestion=req.body;
      QuesTions.filter(upvote=>{

      if(upvote.id===parseInt(params)){
        upvote.createdBy=updatedquestion.createdBy?updatedquestion.createdBy:upvote.createdBy;
        upvote.meetup= updatedquestion.meetup?updatedquestion.meetup:upvote.meetup;
        upvote.title=updatedquestion.title?updatedquestion.title:upvote.title;
        upvote.body=updatedquestion.body?updatedquestion.body:upvote.title;
        upvote.votes=upvote.votes++?upvote.votes++:upvote.votes;
        return res.status(201).json({
            status:201,
            data: upvote
        })
      }else{
        res.status(404).json({
            status:404,
            message: ` the user with this ${downVote.id} is not in our record`
        })
    }
    })
          
    }   

}


module.exports={
    createUpvote,
}