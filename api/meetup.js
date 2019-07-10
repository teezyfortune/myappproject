const express = require('express')
const Users = require('./database');
const uuid = require('uuid');
const helper = require('./helper');



const creaTmeetUp =(req,res)=>{
    const meeTups=Users.meeTup;
    const newMeetup ={
          id:uuid.v4(),
        createdOn :new Date ,
        location : req.body.location,
        topic: req.body.topic,
        happeningOn: new Date(23-7-2019), 
        Tags:'aestthic'
    }

    if(!newMeetup.location || !newMeetup.topic){
        return res.status(400).json({msg:'please enter location and topic'})
    }

    const found = meeTups.find(meetup=> meetup.topic=== newMeetup.topic)
        if(found){
        return res.json({
            status:401,
            message: 'email already exist'
    })
        }
        meeTups.push(newMeetup);
        res.json({
            status:200,
            data: meeTups
        });

}



const getAllmeetup=(req,res) =>{
    const meeTups= Users.meeTup;
  res.status(200).send({
   status:200,
   data:meeTups
  })
}

const getOneMeetup = (req, res)=>{
 const meeTups = Users.meeTup;
 const params = req.params.id;
 const found =meeTups.some(getOne=> getOne.id===parseInt(params));
 if(found){
    res.status(200).json({status:200, data: meeTups.filter(getOne => getOne.id === parseInt(params))
    })
 }else{
     res.status(404).json({
        status:404,
        message:`the recored with id ${params.id} is not in our record`
     })
 }

}

module.exports={
    creaTmeetUp,
    getAllmeetup,
    getOneMeetup,
}
