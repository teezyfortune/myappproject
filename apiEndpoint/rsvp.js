const express = require('express')
const Users = require('./database');
const uuid = require('uuid');
const helper = require('./helper');
const moment = require('moment')


const getRsvp = (req, res)=>{
    const rsvP= Users.rsVp
    const meeTups = Users.meeTup;
    const id =meeTups[1].id
    const topic =meeTups[1].topic
    

const creatRsvp ={
    id:2,
    meetup:id,
    topic:topic,
    status: req.body.status
}

    rsvP.push(creatRsvp);
    res.status(201).json({
        status:201,
        data:creatRsvp
    })
}

module.exports={
    getRsvp
}