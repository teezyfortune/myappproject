const express = require('express');
const router = express.Router();
const {Client} = require('pg')
const bcrypt = require('bcrypt');

const  connectionString ={
   user: "fortune",
   password: "password",
   host:"localhost",
   port: 5432,
   database: "api"
}

   const register = (req, res) => {
   const client = new Client(connectionString);
      client.connect();         
      const {
          name,
          email, 
          password, 
          password2} = req.body
     //validate user input
      const validateInput =() =>{
         if(!name||!email||!password||!password2){
            res.json({msg:'all fields require'})
         }
         if(password < 6){
            res.json({msg:'pasword must be atleast six characters long'})
         }
         if(password !== password2){
            res.json({msg:'pasword not match'})
         }
      }
      const finduserQuery = {
         text: 'SELECT * FROM users WHERE email = $1',
         values: [email.trim().toLowerCase()]
      }

     
      client.query(finduserQuery, (err, result)=>{
         if(result.rowCount !== 0){
            return res.status(409).json({
               status:'error',
                code: 409,
                message: 'Account already in use'
            });
         }
      //hash user password
       const hashed = bcrypt.hash(password,10).then((hash, err) =>{
         if (err) throw (err);
       return hash;
      }).catch( err => console.log(error));
      //creates new data
    if (validateInput()){
      const createQuery = `INSERT INTO  users (name,email, password,created_at), VALUES('${name}','${email}','${hashed}','${Date}') RETURNING id, name, email, password, created_at`;
      client.query(createQuery, (error, user) => {
         client.end();
         const {id}= user.rows[0];
         return res.status(201).json({
            status:'success',
            code: 201,
            message : 'your account has been created succesfully',
            user:{
               id: user.rows[0].id,
               name:user.rows[0].name,
               email: user.rows[0].email,
               created_at: user.rows[0].created_at
            }
         });
      })
   }
   })

}
 
 

module.exports = {
   register
}