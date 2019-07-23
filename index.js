import express from 'express';
import { join } from 'path';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import Routes from './server/apiUsingDbase/modules/Routes';
import routes from './server/dummyData/routes';       
                                                                            
const app = express();
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
                   
//  EJS  engine
//  app.set('view engine', 'ejs');
//  app.use(expressLayouts);
 
//  passport middleware
//  app.use(initialize());
//  app.use(_session());
//  global vars
//  app.use((req, res, next)=>{
//  res.locals.success_msg = req.flash('success_msg')
//  res.locals.err_msg = req.flash('err_msg')
//  next();
//  })

// Routes 
//app.use('api/v1/users', require('../modules/home'))
//app.use('/User', require('./modules/User'));
//app.use('/api/database', require('./server/apiEndpoint/routes'));
app.use('/api/v1/database', routes);
app.use('/api/v1/users', Routes);

//app.use(static(join(__dirname, 'public')))

const PORT = process.env.PORT|| 5005;

app.listen( PORT, ()=>console.log(`server running on ${PORT}`));

export default app;