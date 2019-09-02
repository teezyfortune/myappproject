import jwt from 'jsonwebtoken';
import validator from 'validator';
import isInt from 'validator/lib/isInt';
import isEmail from 'validator/lib/isEmail';
import path from 'path';
import multer from 'multer';

export default class ValidateMiddleWare {
	static validatesignUp(req, res, next) {
		const {
			email,
			password,
		} = req.body;
		if (!email || !password) {
			return	res.status(400).json({
				status: 'error',
				msg: 'all fields required',
			});
		}
		if (email && typeof email !== 'string') {
			return res.status(400).json({
				status: 'error',
				msg: 'email must be a string'
			});
		} if (email && !validator.isEmail(email)) {
			return res.status(400).json({
				status: 400,
				messgae: 'the email you entered is not a valid email'
			});
		}
		if (password && typeof password !== 'string') {
			return	res.status(400).json({
				status: 'error',
				msg: 'password must be a string'
			});
		} if (password && password.includes(' ')) {
			return res.status(400).json({
				status: 'error',
				msg: 'password should not have a space',
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
			happeningon
		} = req.body;
		if (!location
		|| !images
		|| !topic
		|| !tags
		|| !happeningon) {
			return res.status(400).json({
				status: 'error',
				msg: 'all fields required'
			});
		}
		if (location && typeof location !== 'string'
			|| images && typeof images !== 'string'
			|| topic && typeof topic !== 'string'
			|| tags && typeof tags !== 'string'
			|| happeningon && typeof happeningon !== 'string'
		) {
			return 	res.status(400).json({
				status: 'error',
				msg: 'all fields must be a string'
			});
		}
		return next();
	}

	static validatQuestion(req, res, next) {
		const {
			title,
			body
		} = req.body;

		if (!title || !body) {
			return	res.status(400).json({
				status: 'error',
				msg: 'all fields required'
			});
		}
		if (title && typeof title !== 'string' || body && typeof body !== 'string') {
			return	res.json({ msg: 'all fields must be a string' });
		}

		return next();
	}

	static validateprofile(req, res, next) {
		const {
			firstname,
			lastname,
			othername,
			phonenumber,
			username
		} = req.body;
		if (!firstname || !lastname || !othername || !phonenumber || !username) {
			return res.status(400).json({
				status: 400,
				message: 'all fields required'
			});
		}
		if (firstname && typeof firstname !== 'string'
		|| lastname && typeof lastname !== 'string'
		|| othername && typeof othername !== 'string'
		|| phonenumber && typeof phonenumber !== 'string'
		|| username && typeof username !== 'string') {
			return res.status(400).json({
				status: 400,
				message: 'all fields must be a string'
			});
		}
		return next();
	}

	static validateComment(req, res, next) {
		const { comment } = req.body;

		if (comment && typeof comment !== 'string') {
			res.status(400).json({
				status: 400,
				mesage: 'comment must be string'
			});
		} else
		if (!comment) {
			res.status(400).json({
				status: 400,
				messgae: 'ypu must enter acomment'
			});
		}
		return next();
	}

	static validateRSVP(req, res, next) {
		const { response } = req.body;

		if (response && typeof response !== 'string') {
			return res.status(400).json({
				status: 400,
				message: 'response must be a string'
			});
		}
		if (!response) {
			return res.status(400).json({
				status: 400,
				message: 'field required'
			});
		}
		return next();
	}
}
