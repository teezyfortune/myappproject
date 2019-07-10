const express= require('express')
const moment = require('moment')

const formatToLocals = ()=>{
    //string ='8.5.2019 10:11'
    return  moment('8.5.2019 10:11').toLocaleString()
  }

//console.log(formatToLocals('8.5.2018 10:11'));
const database={

user:[{
    id: 1,
    firstname:'john',
    lastname: 'doe',
    othername: 'brooks',
    email:'gabteezy14@gmail.com',
    phoneNumber:'+2347064654254',
    username: 'brooks',
    registered: moment(new Date).toString(),
    isAdmin: true
},
{
    id: 2,
    firstname:'william',
    lastname: 'dennnis',
    othername: 'colgate',
    email:'willimadeny14@gmail.com',
    phoneNumber:'+2348064654254',
    username: 'denwil',
    registered: moment(new Date).toString(),
    isAdmin: false
},
{
    id: 3,
    firstname:'frank',
    lastname: 'joseph',
    othername: 'steven',
    email:'stevfrank4@gmail.com',
    phoneNumber:'+2347068654154',
    username: 'brooks',
    registered:moment(new Date).toString(),
    isAdmin: false
},

],
//meetup object
meeTup:[{
    id:1,
    createdOn :moment(new Date).toString() ,
    location : '22/23 awolowo road oregun ikeja',
    topic: 'The Future of Web development',
    happeningOn: moment('17/7/2019 12:00PM', 'D/M/YYYY h:mmA').toLocaleString(),
    Tags:'UX,User experience'
    },

    {
    id:2,
    createdOn :moment(new Date).toString(),
    location : '2/23 awolowo road oregun ikeja',
    topic: 'Why NodeJs',
    happeningOn:moment('8/10/2019 10:00AM', 'D/M/YYYY h:mmP').toLocaleString(),
    Tags:'frameworks, backend development'

    },
{
    id:3,
    createdOn:moment().toString(),
    location : '22/23 awolowo road oregun ikeja',
    topic: 'what developers dont tell you in programming',
    happeningOn:moment('13/7/2019 12:00PM', 'D/M/YYYY h:mmA').toLocaleString(),
    Tags:'behind the sences'

    },

    {
    id:4,
    createdOn :moment().toString(),
      location : '22/23 awolowo road oregun ikeja',
    topic: 'The Future of Web development',
    happeningOn: moment('25/7/2019 12:00PM', 'D/M/YYYY h:mmA').toLocaleString(),
         Tags:'aestthic'

    }
],

//question object
 quesTion:[
    {
    id: 1,
    createdOn: moment(new Date).toString() ,
    createdBy: 'gabriel', 
    meetup:1 , 
    title: 'new features in html6',
    body: 'The new features in html6 has brought smiles to developers face apparently, but can state api be added to it in due time',
    votes: 3
    }
],
//
   rsVp:[
    {       
    id:1,
    meetup:1,
    user: 1, 
    response: 'yes'  
    }
]
}
// const user = database.user
// user.forEach(name=>{
//     console.log(name.firstname);
// })

// const QuesTions = database.quesTion;
   
//     QuesTions.forEach(questIon=>{
//      console.log(questIon.votes)
//     })


console.log(new Date('8.5.2019 10:11'))
   
    module.exports= database;
    exports.formatToLocals=formatToLocals
  


