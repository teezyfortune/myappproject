const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const  Client = require('./conn');

 const app = express();
 
    // body parser

    app.use(express.json());
    app.use(express.urlencoded({extended: false}))
   
   // engine
 app.set('view engine', 'ejs');
 app.use(expressLayouts);

   //Routes
     app.use('/', require('./routes/home'))
     app.use('/User', require('./routes/User'))

     const PORT = process.env.PORT|| 5005;

  app.listen( PORT, ()=>console.log(`server running on ${PORT}`));