const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const  Client = require('./conn');
//const routes = require('./routes/User')

 const app = express();
 
    

   // engine
 app.set('view engine', 'ejs');
 app.use(expressLayouts);
 
  //body parser
 app.use(express.json());
 app.use(express.urlencoded({extended: false}))

   //Routes
    app.use('/users', require('./routes/home'))
   // app.use('./register', require('./routes/User'))

     const PORT = process.env.PORT|| 5005;

  app.listen( PORT, ()=>console.log(`server running on ${PORT}`));