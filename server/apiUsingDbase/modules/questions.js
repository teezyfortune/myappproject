const helper = require('../helper')
const bcrypt = require('bcrypt');
const conn = require('../../conn')


const createQuestion = (req, res)=>{
    const {createdby, meetup,title,body}=req.body;
    
    if(!createdby||!meetup ||!title|| !body){
        res.json({msg:'all fields require'});
    }

    const 

}