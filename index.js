const express = require('express');
const expressLayouts = require('express-ejs-layouts')
//const routes = require('./routes/User')

 const app = express();
 
    

   //  EJS  engine
 app.set('view engine', 'ejs');
 app.use(expressLayouts);
 
  //body parser
 app.use(express.json());
 app.use(express.urlencoded({extended: false}))

   //Routes
    app.use('/users', require('./modules/home'))
   app.use('/User', require('./modules/User'))

     const PORT = process.env.PORT|| 5005;

  app.listen( PORT, ()=>console.log(`server running on ${PORT}`));