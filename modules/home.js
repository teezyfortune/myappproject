const express = require('express');
const router = express.Router();
const {Client} = require('pg')
//const controller = require('./controller');


 
 //hash user password

  router.get('/', (req, res)=>res.render('welcome'))


module.exports = router;