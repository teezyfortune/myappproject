import express from 'express';
import  Users from './database';
import uuid  from 'uuid';
import helper from './helper';
import moment from 'moment';



const upComingEvent=(req, res)=>{
	const meeTups = Users.meeTup;
	const start = moment('12/7/2019 11:00AM', 'D/M/YYYY h:mmP').toLocaleString();
	const end = moment('25/7/2019  12:00PM', 'D/M/YYYY h:mmA').toLocaleString();
	res.status(200).json({ status:201, message:' created' , data: meeTups.filter(upComing => upComing.happeningOn > start && upComing.happeningOn <= end)})
};
export default {
	upComingEvent
};