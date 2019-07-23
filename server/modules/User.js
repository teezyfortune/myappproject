   const express= require('express');
   const router = express.Router();
   const {Client} = require('pg')
   const controller = require('./controller');
      const bcrypt = require('bcrypt');

  
   router.get('/login', (req, res)=>res.render('login'));
   
  /// register 
   router.get('/register', (req, res)=>res.render('register'));
  
   //register handle
   router.post('/register', controller.register)
   router.post('/login', controller.login)
   
   module.exports = router;