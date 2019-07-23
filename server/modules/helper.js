import express  from 'express';
import bcrypt from 'bcrypt';

export default class helper {
	static comparePassword (password) {
		bcrypt.compare(password, hash).then(res =>res == true );
	}
}
