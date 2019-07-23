import  {express} from 'express';
import Users from './database';
import uuid  from 'uuid';
import  helper from './helper';

const createDownVote = (req, res) => {
	const QuesTions = Users.quesTion;
	const params = req.params.id;
	const found = QuesTions.some(question =>question.id=== parseInt(params));
	if(found){
		const updatedquestion=req.body;
     	 QuesTions.filter(doWnvote=>{
			if(doWnvote.id===parseInt(params)){
				doWnvote.createdBy=updatedquestion.createdBy?updatedquestion.createdBy:doWnvote.createdBy;
				doWnvote.meetup= updatedquestion.meetup?updatedquestion.meetup:doWnvote.meetup;
				doWnvote.title=updatedquestion.title?updatedquestion.title:doWnvote.title;
				doWnvote.body=updatedquestion.body?updatedquestion.body:doWnvote.title;
				doWnvote.votes=doWnvote.votes--?doWnvote.votes--:doWnvote.votes;
				return res.status(201).json({
					status:201,
					data: doWnvote
				});
			}else{
				res.status(404).json({
					status:404,
					message: ` the user with this ${params.id} is not in our record`
				});
			}
		});
	}   
};


export default {
	createDownVote
};