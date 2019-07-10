const express = require('express')
const Users = require('./database');
const uuid = require('uuid');
const helper = require('./helper');


const createQuestion =(req,res)=>{
    const QuesTions = Users.quesTion;
    const user = Users.user;
    const meetup = Users.meeTup;
    

     QuesTions.forEach(questIon=>{
    const newQuestions = {
        id: uuid.v4(),
        createdOn: new Date ,
        createdBy: user[1].firstname,
        meetup:meetup[0].id,
        title: req.body.title,
        body: req.body.body,
        votes: questIon.votes
    }
     
    if(!newQuestions.title || !newQuestions.body){
        return res.json({
            status:401,
            message: 'title and body cant be empty'
    })
}
const found = QuesTions.find(question=> question.title && question.body === newQuestions.title && newQuestions.body);

if(found){
    return res.json({
        status:401,
        message: 'you have asked this question before',
})

}
QuesTions.push(newQuestions);
 res.json({
    status:200,
    data: QuesTions
})
     })
}

const getAllQuestion=(req,res) =>{
    const QuesTions = Users.quesTion;
  res.status(200).send({
   status:200,
   data:QuesTions
  })
}


module.exports={
    createQuestion,
    getAllQuestion
}