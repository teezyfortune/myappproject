import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';


const { expect } = chai;
chai.use(chaiHttp);

const User = {
	email: 'user@gmail.com',
	password: 'user123',
};

const UserMain = {
	email: 'usermain@gmail.com',
	password: 'main123',
};

// const  Delete = () => {
// 	conn.query('TRUNCATE users CASCADE');
// };


let AnotherUserToken;

beforeEach((done) => {
	chai.request(app)
		.post('/api/v1/users/signup')
		.send(UserMain)
		.end((err, res) => {
			AnotherUserToken = res.body.token;
			done();
		});
});
describe('POST  /signup', () => {
	it('should return 201 and create new user', (done) => {
		chai.request(app)
			.post('/api/v1/users/signup')
			.send(User)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.eql(201);
				expect(res.body.message).to.be.eql('success');
				expect(res.body.data).to.be.an('object');
				done();
			});
	});

	it('should return 409 and user already exist in the database ', (done) => {
		chai.request(app)
			.post('/api/v1/users/signup')
			.send(User)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body.msg).to.be.eql('user already exist in the database');
				done();
			});
	});
	it('should login user and return a token', (done) => {
		chai.request(app)
			.post('/api/v1/users/login')
			.send(User)
			.end((err, res) => {
				expect(res).to.have.status(200);
				done();
			});
	});
});
