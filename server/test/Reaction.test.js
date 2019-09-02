import chai from 'chai';
import chaHttp from 'chai-http';
import app from '../../index';


const User = {
	email: 'admin@gmail.com',
	password: 'Admins123'
};
let likeToken;

const { expect } = chai;
chai.use(chaHttp);

before((done) => {
	chai.request(app)
		.post('/api/v1/users/login')
		.send(User)
		.end((err, res) => {
			likeToken = res.body.token;
			done();
		});
});

describe('Likes', () => {
	it('shoiuld like a question and return 201', (done) => {
		chai.request(app)
			.post('/api/v1/users/question/22/likes')
			.set('Authorization', `Bearer ${likeToken}`)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.eql(201);
				expect(res.body.message).to.be.eql('question liked');
				done();
			});
	});
	it('shoiuld like a question and return 200', (done) => {
		chai.request(app)
			.post('/api/v1/users/question/22/likes')
			.set('Authorization', `Bearer ${likeToken}`)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.eql('success');
				done();
			});
	});
	it('should return 404 if no question found', (done) => {
		chai.request(app)
			.post('/api/v1/users/question/100/likes')
			.set('Authorization', `Bearer ${likeToken}`)
			.end((err, res) => {
				console.log('401>>>>>>', res);
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.eql(404);

				done();
			});
	});
});

before((done) => {
	chai.request(app)
		.post('/api/v1/users/login')
		.send(User)
		.end((err, res) => {
			likeToken = res.body.token;
			console.log('>>>>>', likeToken);
			done();
		});
});

describe('unLike', () => {
	it('shoiuld like a question and return 201', (done) => {
		chai.request(app)
			.post('/api/v1/users/question/21/unlike')
			.set('Authorization', `Bearer ${likeToken}`)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.eql(201);
				expect(res.body.message).to.be.eql('question unliked');
				done();
			});
	});
	it('shoiuld update unliked  question and return 200', (done) => {
		chai.request(app)
			.post('/api/v1/users/question/22/likes')
			.set('Authorization', `Bearer ${likeToken}`)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.eql('success');
				done();
			});
	});
	it('should return 404 if no question found', (done) => {
		chai.request(app)
			.post('/api/v1/users/question/100/unlike')
			.set('Authorization', `Bearer ${likeToken}`)
			.end((err, res) => {
				console.log(res);
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.eql(404);
				done();
			});
	});
});
