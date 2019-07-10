const express = require('express');
const path = require('path')
const moment = require('moment')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session');
const passport= require('passport')
  //const Users = require('../api/Routes')

 const app = express();
    
    //body parser
    app.use(express.json());
    app.use(express.urlencoded({extended: false}))
                   
   //  EJS  engine
   app.set('view engine', 'ejs');
   app.use(expressLayouts);
   
 //passport configuration
  require('./config/passport')(passport)

    app.use(session({
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized:true,
      cookie: {secure: true}
    }))
 //  app.use(flash())
   // passport middleware
   app.use(passport.initialize());
    app.use(passport.session());
   //      global vars
  //   app.use((req, res, next)=>{
  //   res.locals.success_msg = req.flash('success_msg')
  //   res.locals.err_msg = req.flash('err_msg')
  //    next();
  // })

   //Routes
    app.use('/users', require('./modules/home'))
    app.use('/User', require('./modules/User'))
    app.use('/api/database', require('./api/Routes'))
    app.use('/api/database', require('./api/Routes'))

    app.use(express.static(path.join(__dirname, 'public')))

     const PORT = process.env.PORT|| 5005;

  app.listen( PORT, ()=>console.log(`server running on ${PORT}`));