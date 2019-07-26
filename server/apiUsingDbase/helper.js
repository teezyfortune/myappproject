import bcrypt from 'bcrypt';

export default class helper {
	static encCryptPassword(password) {
		return 	bcrypt.hashSync(password, 10);
	}

	static verifyPassword(password, hashPassword) {
		return bcrypt.compareSync(password, hashPassword);
	}
}
