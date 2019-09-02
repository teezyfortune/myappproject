import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const { expect } = chai;

chai.use(chaiHttp);
chai.should();
chai.expect();


const Inputs = {
	email: 'Admin@gmail.com',
	password: 'Admins123',
};
let userToken;

before((done) => {
	chai.request(app)
		.post('/api/v1/users/signup')
		.send(Inputs)
		.end((err, res) => {
			userToken = res.body.token;
			done();
		});
});

describe('POST validates SignUp', () => {
	it('should return 400 if all inputs are empty', (done) => {
		chai.request(app)
			.post('/api/v1/users/signup')
			.send({
				email: '',
				password: '',
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.eql('error');
				done();
			});
	});
	it('should return 400 if email is not a string', (done) => {
		chai.request(app)
			.post('/api/v1/users/signup')
			.send({
				email: true,
				password: 'Admin123',
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.eql('error');
				done();
			});
	});

	it('should return 400 if email is not valid', (done) => {
		chai.request(app).post('/api/v1/users/signup')
			.send({
				email: 'examplegmail.com',
				password: 'Admin123',
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.eql(400);
				done();
			});
	});
	it('should return 400 if password is not a string', (done) => {
		chai.request(app)
			.post('/api/v1/users/signup')
			.send({
				email: 'example@gmail.com',
				password: true,
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.eql('error');
				expect(res.body.msg).to.be.eql('password must be a string');
				done();
			});
	});
	it('should return 400 if password contain space', (done) => {
		chai.request(app)
			.post('/api/v1/users/signup')
			.send({
				email: 'example@gmail.com',
				password: ' ',
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.eql('error');
				expect(res.body.msg).to.be.eql('password should not have a space');
				done();
			});
	});
	it('should return 400 if password less than six characters', (done) => {
		chai.request(app)
			.post('/api/v1/users/signup')
			.send({
				email: 'example@gmail.com',
				password: 'Admin',
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.eql('error');
				expect(res.body.msg).to.be.eql('password length too short');
				done();
			});
	});
});

describe('Meetup validation ', () => {
	it('should return 400 if all input are empty', (done) => {
		chai.request(app)
			.post('/api/v1/users/meetup')
			.set('Authorization', `Bearer ${userToken}`)
			.send({
				location: '',
				images: '',
				topic: '',
				tags: '',
				happeningon: ''
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.eql('error');
				done();
			});
	});

	it('should should check if all inputs are string', (done) => {
		chai.request(app)
			.post('/api/v1/users/meetup')
			.set('Authorization', `Bearer ${userToken}`)
			.send({
				location: true,
				image: '/images/test.jpeg',
				topic: 'WHY JS',
				tags: 'Web Dev',
				happeningon: ''
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.eql('error');
				done();
			});
	});
});
describe('question validation', () => {
	it('should check if all fields are entered', (done) => {
		chai.request(app)
			.post('/api/v1/users/meetup/:id/question')
			.set('Authorization', `Bearer ${userToken}`)
			.send({
				title: 'web',
				body: ''
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.status).to.be.eql(400);
				done();
			});
	});
	it('should check if all fields are string', (done) => {
		chai.request(app)
			.post('/api/v1/users/meetup/:id/question')
			.set('Authorization', `Bearer ${userToken}`)
			.send({
				title: true,
				body: ''
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.status).to.be.eql(400);
				done();
			});
	});
});
describe('validate users profile', () => {
	it('should return 400 if all fields are not provided', (done) => {
		chai.request(app)
			.put('/api/v1/users/UpdateProfile')
			.set('Authorization', `Bearer ${userToken}`)
			.send({
				firstname: '',
				lastname: 'john',
				othername: '',
				phonenumber: '',
				username: '@Admin'
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.status).to.be.eql(400);
				expect(res.body.message).to.be.eql('all fields required');
				done();
			});
	});

	it('should return 400 if all fields are not string', (done) => {
		chai.request(app)
			.put('/api/v1/users/UpdateProfile')
			.set('Authorization', `Bearer ${userToken}`)
			.send({
				firstname: true,
				lastname: 'john',
				othername: 1234,
				phonenumber: true,
				username: '@Admin'
			})
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.status).to.be.eql(400);
				expect(res.body.message).to.be.eql('all fields must be a string');
				done();
			});
	});
});
