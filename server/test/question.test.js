import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';


const { expect } = chai;
chai.use(chaiHttp);

// conn.query('TRUNCATE question CAS')
const mainUser = {
	email: 'admin@gmail.com',
	password: 'Admins123'
};
let anotherUserToken;
before((done) => {
	chai.request(app)
		.post('/api/v1/users/login')
		.send(mainUser)
		.end((err, res) => {
			anotherUserToken = res.body.token;
			done();
		});
});

const question = {
	title: 'Node js Anggulr',
	body: 'some nkndsms fbfjbfnfkf'
};
describe('question  handle', () => {
	it('should create a questionn refereing to a meetup id and a valid user id', (done) => {
		chai.request(app)
			.post('/api/v1/users/meetup/31/question')
			.set('Authorization', `Bearer ${anotherUserToken}`)
			.send(question)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.eql(201);
				expect(res.body.question).to.be.an('object');
				setTimeout(() => { done(); }, 500);
				// console.log('>>>>Questionstatus', res.status);
			});
	});
	it('should create a questionn refereing to a meetup id and a valid user id', (done) => {
		chai.request(app)
			.post('/api/v1/users/meetup/31/question')
			.set('Authorization', `Bearer ${anotherUserToken}`)
			.send(question)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body.status).to.be.eql(409);
				setTimeout(() => { done(); }, 500);
			});
	});
});
