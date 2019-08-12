import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';


const { expect } = chai;
chai.use(chaiHttp);

// conn.query('TRUNCATE question CAS')
const AnotherUser = {
	email: 'usermain@gmail.com',
	password: 'main123',
};
let AnotherUserToken;
beforeEach('create question', (done) => {
	chai.request(app)
		.post('/api/v1/users/login')
		.send(AnotherUser)
		.end((err, res) => {
			AnotherUserToken = res.body.token;
			done();
		});
});

const question = {
	title: 'IONI JS',
	body: 'some thing ncnfbjsbvmnd fbfjbfnfkf'
};
describe('question  handle', () => {
	it('should create a questionn refereing to a meetup id and a valid user id', (done) => {
		chai.request(app)
			.post('/api/v1/users/meetup/11/question')
			.set('Authorization', `Bearer ${AnotherUserToken}`)
			.send(question)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.eql(201);
				expect(res.body.question).to.be.an('object');
				setTimeout(() => { done(); }, 500);
			});
	});
});
