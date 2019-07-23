import express from 'express';
import  Users from './database';
import { v4 } from 'uuid';
import helper from './helper';

const createQuestion =(req,res)=>{
	const QuesTions =Users.quesTion;
	const user = Users.user;
	const meetup =Users.meeTup;
	
	QuesTions.forEach(questIon=>{
		const newQuestions = {
			id:QuesTions[0].id+1,
			createdOn: new Date ,
			createdBy: user[1].firstname,
			meetup:meetup[0].id,
			title: req.body.title,
			body: req.body.body,
			votes: questIon.votes
		};
		
		if(!newQuestions.title || !newQuestions.body){
			return res.json({
				status:401,
				message: 'title and body cant be empty'
			});
		}
		const found = QuesTions.find(question=> question.title && question.body === newQuestions.title && newQuestions.body);
		if(found){
			return res.json({
				status:401,
				message: 'you have asked this question before',	
			});
		}
		QuesTions.push(newQuestions);
		res.json({
			status:200,
			data: QuesTions
		});
	});
};

const getAllQuestion=(req,res) =>{
    const QuesTions = quesTion;
  res.status(200).send({
   status:200,
   data:QuesTions
  })
};


export default{
    createQuestion,
    getAllQuestion
};