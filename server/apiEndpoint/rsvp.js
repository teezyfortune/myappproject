import express from 'express';
import { rsVp, meeTup } from './database';
import uuid from 'uuid';
import helper from './helper';
import moment from 'moment';


const getRsvp = (req, res)=>{
	const rsvP= rsVp;
	const meeTups = meeTup;
	const id =meeTups[1].id;
	const topic =meeTups[1].topic;
    

	const creatRsvp ={
		id:2,
		meetup:id,
		topic:topic,
		status: req.body.status
	};
	rsvP.push(creatRsvp);
	res.status(201).json({
		status:201,
		data:creatRsvp
	});
};

export default{
	getRsvp
};