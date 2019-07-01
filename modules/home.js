const express = require('express');
const router = express.Router();
const {Client} = require('pg')
//const controller = require('./controller');


 
 //hash user password

  router.get('/', (req, res)=>{
     const {email}=req.body;
const  connectionString ={
    user: "fortune",
    password: "password",
    host:"localhost",
    port: 5432,
    database: "api"
 }
  

   const client = new Client(connectionString);
       client.connect();         

 
 const queryResult = client.query('SELECT * FROM users WHERE email = $1',[email]).then(result => {
    if(result.rowCount){
       return res.status(409).json({
          status:'error',
           code: 409,
           message:'Account already in use'
       });d
    }else{
      return res.json({msg:'create account'})
    }
    }).catch(err=>console.log(err))
 
     
  })


module.exports = router;