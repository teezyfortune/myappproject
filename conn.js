const {Client} = require('pg')
const client = new Client({

user: "postgres",
password: "postgres",
host:"localhost",
port: 5432,
database: "api"
  
}); 
 
// const errors =[];

  client.connect()
.then(()=> console.log('connected successfully'));

//            const createUser = ()=>{    
//     const {name, email, password, password2} = req.body;
//     //   checking input fields
//    if(!name|| !email|| !password){
//        errors.push({msg: 'please fill in all fillds' })
//    }
//    //checking password match
//     if (password !== password2 ){
//         errors.push({msg: 'password not match'})
//     }
 
//     //password length
//     if (password.length < 8){
//         errors.push({msg: 'password must be 8 character long'})
//     }
 
//     if(errors > 0 ){
//         res.render('register', {
//             errors,
//             name,
//             email,
//             password,
//             password2
//         })
//        }
//    const crateUser = client.query("INSERT INTO users(name, email,pword, confirm_pass) VALUES ($1, $2, $3, $4)" [ name, email, password, password2])
//         .then( results =>{
//         res.status(200).res.render(`user inserted with username ${name}`)
//     .catch((e) => console.log(`error uploading data ${e}`))
//         .finally(()=>client.end());
        
//     })

    
        
//            }
//                // gets all user in ascending order
//                 const getUsers = (req, res) =>{
//                 client.query("SELECT * FROM users ORDER BY id ASC").then(results=>{
//                     res.status(200).json(results.rows);
//                 }).catch(e => console.log("no data found"))
//                 .finally(()=>client.end());
//                 }


//                 const getUserById = (req,res)=>{
//                     const id =  parseInt(req.params.id);
//                 client.query("  SELECT * FROM users WHERE id = $1", [id]).then( results=>{
//                     res.status(200).json(results.rows)
//                     .cacth( e => console.log('no results'))
//                     .finally(()=>client.end());

//                 })

//                  }
//                 //     // updates database
//                 const updateUser =(req, res)=>{

//                     const id = parseInt(req.params.id);
//                     const {name, email}= req.body;
//                 client.query(" UPDATE users SET  name =$1, email = $2 WHERE id = $3", ["kunle", "smart@gmail.com", 3])
//                 .then(results =>{ 
//                     res.status(200).send(`user with id ${id} updated succesfully`)
//                 .catch( e => console.log('no data modified'))
//                 .finally(()=>client.end());

//                 })
//                 }

//                 // deletes a single user
//                 const  deleteUser = (req, res)=>{
//                     const id = parseInt(req.params.id)
//                     client.query(" DELETE FROM users WHERE email = $1", [email])
//                     .then( result =>{
//                         res.status(200).send(`user with id ${id} as been deleted`)
//                     } )
//                     .catch(e =>{
//                         console.log('oops! somethingwent wrong')
//                     })
//                     .finally(()=>client.end());
//                 } 
module.exports= Client;
  


 