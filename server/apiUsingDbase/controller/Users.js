import jwt from 'jsonwebtoken';
import helper from '../helper';
import conn from '../../config';
import dotenv from 'dotenv';

dotenv.config();

//  sign up handle
export default class UserController {
	static signUp(req, res) {
		const {
			email,
			password,
		} = req.body;
		const sql = {
			name: 'checkEmail',
			text: 'SELECT * FROM users WHERE email = $1 LIMIT 1',
			values: [email]
		};
		conn.query(sql).then((result) => {
			if (result.rowCount !== 0) {
				return res.status(409).json({
					status: 409,
					msg: 'user already exist in the database'
				});
			}
			const hash = helper.encCryptPassword(password);
			const query = 'INSERT INTO users(email,password,isAdmin) VALUES ($1,$2,$3) RETURNING  email, registered,isAdmin';
			const values = [
				email,
				hash,
				false
			];
			conn.query(query, values)
				.then((user) => {
					const { id } = user.rows[0];
					jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '420s' }, (err, token) => {
						res.status(201).json({
							status: 201,
							message: 'success',
							token,
							data: user.rows[0]
						});
					});
				}).catch((err) => {
					console.log(err);
				});
		}).catch((err) => {
			console.log(err);
		});
	}
	//	login handle

	static login(req, res) {
		const { email, password } = req.body;
		const sqlText = 'SELECT * FROM users WHERE email =$1 LIMIT 1';
		const values = [email];
		conn.query(sqlText, values).then((user) => {
			if (!user.rowCount) {
				res.status(400).json({ msg: 'no user with this email' });
			}
			if (!helper.verifyPassword(password, user.rows[0].password)) {
				res.json({ msg: 'in valid password' });
			}
			const { id } = user.rows[0];
			jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '2hrs' }, (err, token) => {
				res.status(200).json({
					status: 200,
					message: `you are logged in as ${user.rows[0].email} `,
					token,
					email: user.rows[0].email,
					username: user.rows[0].username
				});
			});
		});
	}

	static userProfile(req, res) {
		const { userId } = req;
		const checkMatch = {
			text: 'SELECT * FROM users WHERE id = $1',
			values: [userId]
		};
		conn.query(checkMatch, (err, profileInfo) => {
			if (profileInfo.rowCount === 0) {
				res.status(404).json({
					status: 404,
					message: 'you are not loggedIn'
				});
			} else {
				res.status(200).json({
					status: 200,
					profile: {
						firstname: profileInfo.rows[0].firstname,
						lastname: profileInfo.rows[0].lastname,
						othername: profileInfo.rows[0].othername,
						email: profileInfo.rows[0].email,
						phonenumber: profileInfo.rows[0].phonenumber,
						username: profileInfo.rows[0].username

					}
				});
			}
		});
	}

	static updateProfile(req, res) {
		const {
			firstname,
			lastname,
			othername,
			phonenumber,
			username
		} = req.body;
		const { userId } = req;
		const checkExist = {
			text: ' SELECT * FROM users WHERE id =$1',
			values: [userId],
		};
		conn.query(checkExist, (err, exist) => {
			if (exist.rowCount === 0) {
				return res.status(404).json({
					status: 404,
					message: `no user with id: ${userId}`
				});
			}
		});

		const UpdateSql = {
			name: 'profileUpdate',
			text: 'UPDATE users SET firstname = $1, lastname = $2, othername =$3, phonenumber=$4 , username =$5 WHERE id =$6 RETURNING *',
			values: [firstname.trim().toLowerCase(), lastname.trim().toLowerCase(), othername.trim().toLowerCase(), phonenumber.trim().toLowerCase(), username.trim().toLowerCase(), userId]
		};
		conn.query(UpdateSql, (err, Updatedprofile) => {
			if (err) {
				console.log(err);
				res.status(400).json({
					status: 400,
					message: 'Oops! something went wrong'
				});
			} else {
				res.status(200).json({
					status: 200,
					profileInfo: {
						firstname: Updatedprofile.rows[0].firstname,
						lastname: Updatedprofile.rows[0].lastname,
						othername: Updatedprofile.rows[0].othername,
						email: Updatedprofile.rows[0].email,
						phonenumber: Updatedprofile.rows[0].phonenumb
					}
				});
			}
		});
	}
}
