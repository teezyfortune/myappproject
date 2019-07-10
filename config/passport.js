  const localStrategy = require('passport-local').Strategy;
  const bcrypt = require('bcrypt');
  const conn = require('../conn')

//  load User Model

const User = require('../modules/controller')

module.exports =function(passport){
   passport.use(
new localStrategy({usernameField: 'email'}, (email, password, done)=>{
          const conFirmEmail = {
               name:'sql',
               text: 'SELECT * FROM users WHERE email=$1',
               values: [email]
          }
         conn.query(conFirmEmail) 
         .then(user=> {
          user = user.password;
      if(!user){
          return done(null, false, {message: 'email not register'})
      }
      bcrypt.compare(password, user.password).then(isPassword=>{
        console.log(user.password)
        if(isPassword){
          return done(null, user)
        }else{
           return done(null,false, {message:'password not match'})
        }
     })
      .catch(err=>console.log(err))
        })
        .catch(err =>console.log(err))
    })
    )
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((user, done)=>{
    const getByid ={
         name:'userId',
         text:' SELECT * FROM users WHERE id = $1',
          values: [user.id]
    }
    conn.query(getByid,(err, user) =>{
        done(err,user)
    })
})
}