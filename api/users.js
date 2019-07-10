const express = require('express')
const Users = require('./database');
const uuid = require('uuid');
const helper = require('./helper');


const getOneById = ((req, res)=>{
    const users=Users.user;
    const found = users.some((user=>user.id === parseInt(req.params.id)))
  if(found){
  res.json(users.filter(user=>user.id === parseInt(req.params.id)))
  }else{
      res.status(401).json(`can not retrieve user with id ${req.params.id}`);
  }
  
})

const createUser = (req, res)=>{ 
    const users=Users.user;
    const newUser = {
        id:uuid.v4(),
        firstname: req.body.firstname,
        lastname: req.body.lastname, 
        othername: req.body.othername,
        email: req.body.email,
        phoneNumber:req.body.phoneNumber,
        username: req.body.username,
        registered:new Date,
        isAdmin:false
    };

    if(!newUser.firstname||!newUser.lastname || !newUser.othername ||!newUser.email || !newUser.phoneNumber||!newUser.username){
        return  res.json({msg:'please enter all required fields'});
    }
    const found = users.find(user =>user.email=== newUser.email)
    if(found){
    return    res.json({
            status:200,
            message: 'email already exist'
    })
}
    console.log(users)
    Users.push(newUser)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    res.json({
        status:200,
        data: users
        
})
}

 const UpdateUser =(req, res)=>{
    const users=Users.user;
    const found = users.some((user=>user.id === parseInt(req.params.id)))
    if(found){
        const updatedMember=req.body;
        users.forEach(user=>{
            if(user.id === parseInt(req.params.id)){
                  user.firstname= updatedMember.firstname?updatedMember.firstname:user.firstname;
                 user.lastname = updatedMember.lastname?updatedMember.lastname:user.lastname;
                 user.othername = updatedMember.othername? updatedMember.othername: user.othername;    
                  user.email = updatedMember.email?updatedMember.email:user.email;
                 user.phoneNumber =updatedMember.phoneNumber? updatedMember.phoneNumber: user.phoneNumber;
                 user.username = updatedMember.username?updatedMember.username:user.username;

               return  res.json({msg:'user updated', user})
            }
        })
    }else{
        res.status(401).json(`can not retrieve user with id ${req.params.id}`);
    }
 }
 const deleteUser = (req, res)=>{
    const users=Users.user;
    const found = users.some((user=>user.id === parseInt(req.params.id)))
    if(found){
    res.json({msg:'user deleted ', users: users.filter(user=>user.id !== parseInt(req.params.id))})
    }else{
        res.status(401).json(`can not retrieve user with id ${req.params.id}`);
    }
 }
module.exports={
    getOneById,
    createUser,
    UpdateUser,
    deleteUser
}
