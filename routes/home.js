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
 
     const data = {
          values:[email]
     }
    
 
 const queryResult = client.query('SELECT * FROM users WHERE email = $1',(err, result)=>{
    if(result.rowCount !== 0){
       return res.status(409).json({
          status:'error',
           code: 409,
           message:'Account already in use'
       });
    
    }
    });
 
     
  })


module.exports = router;