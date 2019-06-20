   const express= require('express');
   const router = express.Router();
   const  Client = require('../conn');
   const bycrypt = require('bcrypt');

   const client = new Client({

      user: "postgres",
      password: "postgres",
      host:"localhost",
      port: 5432,
      database: "api"
        
      }); 
   client.connect()
      
   router.get('/login', (req, res)=>res.render('login'));
   // l
  /// register 
   router.get('/register', (req, res)=>res.render('register'));
  
   // register handle
router.post('/register', (req, res)=>{
   const {name,email, password, password2} = req.body;

   const errors = [];
      // checking all fields
   if (!name||!email || !password || !password2){
      errors.push({msg:'please fill in all fields'})
   }
    
   // checking password match

   if (password!== password2){
      errors.push({msg: 'password not match'})
   }

   if(password.length < 6){
errors.push({msg: 'password length should be atleast six charcter long'})
   } 

   if (errors.length > 0){
      res.render('register', {
         errors,
         name, 
         email,
         password,
         password2   
        });
     }else{
      client.connect()
   client.query("SELECT * FROM users WHERE email = $1", [email])
   .then(results => {
   //  console.log(results.rows()); 
 if(results){
          //User exist
   errors.push({msg:'user already exist'})
   res.render('register', { 
      errors,
      name,
      email,
      password,
      password2
   })
   console.log(results.rows)
  }  

   })
   // console.log(req.body);
   // //res.redirect('../login');
   // res.send('hello');
     
}
     
//else{

   //       //hash password
   //       bycrypt.hash( results.password, 10).then((hash, err)=>{
   //          if(err)throw err;
   //       results.password = hash;
   //          // insert new user
   //          client.query("INSERT INTO users (name, email, pword, date_created) VALUES($1,$2,$3,$4)",[name, email, password, Date.now()])
   //       }).then(user =>{
   //          console.log(use.rows);
   //          res.send('hello');
      

   //       }).catch( err => console.log(err));
   //    }


   // })
   
    
})

   module.exports = router;