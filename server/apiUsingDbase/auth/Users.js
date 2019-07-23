import jwt  from 'jsonwebtoken';
// const Client= require('../../apiEndpoint@/configpath/dbconfig')
import helper  from '../helper';
import  bcrypt  from 'bcrypt';
import conn from '../../conn';

//  sign up handle
export default class UserController{
	static signUp (req, res) {
		const { 
			email, 
			password,
			username } = req.body;
		const sql={
			name:'checkEmail',
			text:'SELECT * FROM users WHERE email = $1',
			values:[email]
		};
		conn.query(sql).then((result)=>{
			if (result.rowCount !== 0){
				res.status(409).json({
					status:409,
					msg:'user already exist in the database'

				});
			}else{
				bcrypt.hash(password, 10)
					.then(hash=>{
						const query = 'INSERT INTO users(email,password,username, registered, isAdmin) VALUES ($1,$2,$3,$4,$5) RETURNING  email, username,registered,isAdmin'; 
						const values = [
							email, 
							hash, 
							username, 
							new Date(),
							true
						];
						conn.query(query,values)
							.then(user=>{
								const{id} = user.rows; 
								jwt.sign({id}, 'westkainda', {expiresIn:'420s'}, (err, token)=>{
									res.status(201).json({
										status:201,
										token:token,
										data:user.rows[0]
									});
								});
							}).catch(err=> {
								console.log(err);
							});

					}).catch(err=> 
					{
						console.log(err);
					});
			}
		}).catch(err=> {
			console.log(err);
		});
	}

	//	login handle
	static  login (req, res) {
		const{email, password}=req.body;
		const sqlText = 'SELECT * FROM users WHERE email =$1';
		const values = [email];
		conn.query (sqlText, values).then(user=>{
			if (!user.rowCount){
				res.json({msg:'no user with this email'});
			}
			if (!helper.verifyPassword(password, user.rows[0].password)){
				res.json({msg:'in valid password'}); 
			}
			//const {id} =user.rows;
			jwt.verify(req.token,'westkainda',(err, authData)=>{		
				if (err) throw err;
				res.status(200).json({
					status:200,
					message:`you are logged in as ${user.rows[0].email} `,
					token: authData,
					data: user.rows  
				});
			});
		});
	}	
}
