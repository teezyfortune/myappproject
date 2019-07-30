import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import conn from '../config';


const { expect } = chai;
chai.use(chaiHttp);

const User = {
	email: 'usser@gmail.com',
	password: 'new123',
	username: 'AdminUser1'
};
const  Delete = () => {
	conn.query('TRUNCATE users CASCADE');
};

beforeEach('truncating conn', (done) => {
	chai.request(app)
		.post('/api/v1/users/signup')
		.send(User);
	Delete();
	setTimeout(() => { done(); }, 1000);})


describe('POST  /signup', () => {
	it('should return 201 and create new user', (done) => {
		chai.request(app)
			.post('/api/v1/users/signup')
			.send(User)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.token).to.be.a('toke');
				expect(res.body.data).to.be.an('object');
				setTimeout(() => { done(); }, 1000);
			})
	});

	it('should return 409 and user already exist in the database message', (done)=>{
		chai.request(app)
			.post('/api/v1/users/signup')
			.send(User)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body.msg).to.be.eql('user already exist in the database');
				setTimeout(() => { done(); }, 1000);
			})

	});
});
