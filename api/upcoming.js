const express = require('express')
const Users = require('./database');
const uuid = require('uuid');
const helper = require('./helper');
const moment = require('moment')



const upComingEvent=(req, res)=>{
    const meeTups = Users.meeTup;
    const start = moment('12/7/2019 11:00AM', 'D/M/YYYY h:mmP').toLocaleString();
    const end = moment('25/7/2019  12:00PM', 'D/M/YYYY h:mmA').toLocaleString();
  
    res.status(200).json({ status:201, message:' created' , data: meeTups.filter(upComing => upComing.happeningOn > start && upComing.happeningOn <= end)})
  }

  module.exports={
      upComingEvent
  }