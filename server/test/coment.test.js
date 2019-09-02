import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const { expect } = chai;
chai.use(chaiHttp);

const anotherUser = {
	email: 'usermain@gmail.com',
	password: 'main123',
};
let AnotherUserToken;

const commentSample = {
	comment: 'ionic is a very nice tool'
};

before((done) => {
	chai.request(app)
		.post('/api/v1/users/login')
		.send(anotherUser)
		.end((err, res) => {
			AnotherUserToken = res.body.token;
			done();
		});
});

describe('Comments', () => {
	it('should comment on existing question', (done) => {
		chai.request(app)
			.post('/api/v1/users/question/19/comment')
			.send(commentSample)
			.set('Authorization', `Bearer ${AnotherUserToken}`)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.eql(201);
				expect(res.body.data).to.be.an('object');
				done();
			});
	});
	it('should return 404 if no comment found', (done) => {
		chai.request(app)
			.post('/api/v1/users/question/99/comment')
			.send(commentSample)
			.set('Authorization', `Bearer ${AnotherUserToken}`)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.eql(404);
				done();
			});
	});
	it('should return 409 if question comment already exist', (done) => {
		chai.request(app)
			.post('/api/v1/users/question/19/comment')
			.send(commentSample)
			.set('Authorization', `Bearer ${AnotherUserToken}`)
			.end((err, res) => {
				expect(res).to.have.status(409);
				expect(res.body.status).to.be.eql(409);
				done();
			});
	});
});
