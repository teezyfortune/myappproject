const express = require('express')
const Users = require('./database');
const uuid = require('uuid');
const helper = require('./helper');


const createDownVote = (req, res) => {
    const QuesTions = Users.quesTion;
    const user = Users.user;
    const meetup = Users.meeTup;
    
    const params = req.params.id;
 const found = QuesTions.some(question =>question.id=== parseInt(params))
    if(found){
        const updatedquestion=req.body;
      QuesTions.filter(doWnvote=>{
      if(doWnvote.id===parseInt(params)){
        dowWvote.createdBy=updatedquestion.createdBy?updatedquestion.createdBy:doWnvote.createdBy;
        doWnvote.meetup= updatedquestion.meetup?updatedquestion.meetup:doWnvote.meetup;
        doWnvote.title=updatedquestion.title?updatedquestion.title:dowWvote.title;
        doWnvote.body=updatedquestion.body?updatedquestion.body:doWnvote.title;
        doWnvote.votes=doWnvote.votes--?doWnvote.votes--:doWnvote.votes;
        return res.status(201).json({
            status:201,
            data: upvote
        })
      }
    })
}
   
}   