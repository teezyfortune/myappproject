   const express= require('express');
   const router = express.Router();
   const controller = require('./controller');
      const bycrypt = require('bcrypt');

  
   router.get('/login', (req, res)=>res.render('login'));
   
  /// register 
   router.get('/register', (req, res)=>res.render('register'));
  
   // register handle
//router.post('/register', controller.register())
   module.exports = routes;