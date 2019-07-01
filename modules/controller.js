const express = require('express');
const bcrypt = require('bcrypt');
const conn = require('../conn')
//const  helper =require('../modules/helper')
   
   const register = (req, res) => {
      const{name, email, password, password2}=req.body
      let errors = [];
      const validate = () => {
         //  check require fields
         if(!name||!email||!password||!password){
          errors.push({msg:'all fields required'});
         }
         //password match
         if( password !== password2){
         errors.push({msg:'password not match'});
         }
         //password lenght
         if(password < 6){
          errors.push({msg:'password must be aleast six charcters'})
         }
              }
    if(errors.length > 0){
       res.render('register',{
      errors,
       name, 
       email,
       password,
       password2
       })
    }else{ 
      const isExistEmail = {
         name: 'checkExist',
         text: ' SELECT * FROM users WHERE  email = $1',
         values: [email],
      }
      conn.query(isExistEmail).then(result =>{
         if(result.rowCount !== 0){
            errors.push({msg:'user already exist'})
            res.render('register',{
               errors,
                name, 
                email,
                password,
                password2
                })
         }
      }).catch(err=>console.log(err.stack))
//res.status(200).json({msg:`welcome ${name}`}); 
          bcrypt.hash(password, 10)
            .then( hash=>{
         const CreateUser = {
            name:'User',
            text: 'INSERT INTO users(name,email,password, created_at) VALUES($1,$2,$3,$4)',
            values: [name,email,hash, new Date()], 
         }
          conn.query(CreateUser)
          .then(user =>{
           //  user ={name,email}
            // res.status(200).json({
            //       status:'success',
            //       code:201,
            //       message:`welcome ${req.body.name}`,
            //       name:user.name,
            //       email:user.email,
            //       created:new Date
            //       })
            res.redirect('/User/login')
         }).catch(err=> console.log(err.stack))

          }).catch(err => console.log(err.stack))
   }
}
 
   const login = (req, res)=>{
      const {email, password}=req.body
      let errors = []
      if(!email || !password){
         errors.push({msg:'your input are not correct, enter correct details'})
      }
      const isExistEmail = {
         name: 'checkExist',
        text: 'SELECT * FROM users WHERE  email = $1',
         values: [email],
      }
      conn.query(isExistEmail).then(userExist =>{
         if(userExist){
          console.log('>>>>>>',userExist.password)
         bcrypt.compare(password, userExist.password).then(isMatch =>{ 
            if(isMatch){
               res.status(201).json({msg:`you logged in as ${email}`})
            }else{
               errors.push({msg:'user name and password incorect'})
            }

         }).catch(err=>console.log(err))
         }
      }).catch(err=>console.log(err))
   }
module.exports = {
   register,
   login
}