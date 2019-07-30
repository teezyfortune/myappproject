import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class ValidateMiddleWare {
	static validatesignUp(req, res, next) {
		const {
			email,
			password,
			username
		} = req.body;
		if (!email || !password || !username) {
			return res.status(400).json({
				status: 'error',
				msg: 'all fields required',
			});
		}
		if (password.length < 6) {
			return res.status(400).json({
				status: 'error',
				msg: 'password length too short',
			});
		}
		return next();
	}

	//  validate sign in
	static validateSignIn(req, res, next) {
		const {
			email,
			password
		} = req.body;
		if (!email || !password) {
			return res.status(400).json({
				status: 'error',
				msg: 'email and password required'
			});
		}
		return next();
	}

	//  verifies token
	static VerifyToken(req, res, next) {
		const bearerHeader = req.headers.authorization;
		// Bearer is not undefined
		const Bearer = bearerHeader.split(' ');
		const bearerToken = Bearer[1];
		req.token = bearerToken;
		jwt.verify(req.token, process.env.SECRET_KEY, (err, decoded) => {
			if (err) {
				res.status(401).json({
					code: 401,
					messgae: 'u are not loggedIn'
				});
			}
			req.userId = decoded.id;
            console.log('>>>>>>>', decoded.id);
            console.log('>>>>>>', new Date())
			return next();
		});
	}

	// validates meetup
	static validateMeetUp(req, res, next) {
		const {
			location,
			images,
			topic,
			tags,
		} = req.body;
		if (!location
       || !images
       || !topic
       || !tags) {
			res.json({ msg: 'all fields required' });
		}
		return next();
	}

	static validatQuestion(req, res) {
		const {
			meetup,
			title,
			body
		} = req.body;

		if (!meetup || !title || !body) {
			res.json({ msg: 'all fields require' });
		}
	}
}
