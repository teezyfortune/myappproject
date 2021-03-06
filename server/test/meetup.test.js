import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';


const { expect } = chai;
chai.use(chaiHttp);

const mainUser = {
	email: 'testing@gmail.com',
	password: 'test123'
};

let anotherUserToken;

let faketoken;


before((done) => {
	chai.request(app)
		.post('/api/v1/users/login')
		.send(mainUser)
		.end((err, res) => {
			anotherUserToken = res.body.token;
			done();
		});
});
const sampleMeetup = {
	location: '20 oregun alen,yard 158',
	images: '/testingimg.jpeg',
	topic: 'Why React Js',
	happeningon: '16 aug 2019, 10:00:am',
	tags: 'UI technology',
};

describe('meetup controller test', () => {
	it('should create new meeetup', (done) => {
		chai.request(app)
			.post('/api/v1/users/meetup')
			.set('Authorization', `Bearer ${anotherUserToken}`)
			.send(sampleMeetup)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.eql(201);
				expect(res.body.message).to.be.eql('meetup created successfully');
				expect(res.body.meetup).to.be.an('object');
				done();
				console.log('>>>', res);
			});
	});
	it('return 409 if meetup already exist', (done) => {
		chai.request(app)
			.post('/api/v1/users/meetup')
			.set('Authorization', `Bearer ${anotherUserToken}`)
			.send(sampleMeetup)
			.end((err, res) => {
				console.log('>>>', res);
				expect(res).to.have.status(409);
				expect(res.body.status).to.be.eql(409);
				expect(res.body.msg).to.be.eql('topic already exist, enter another topic');
				done();
			});
	});
	it('get all meetup', (done) => {
		chai.request(app)
			.get('/api/v1/users/meetup')
			.set('Authorization', `Bearer ${anotherUserToken}`)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.eql('ok');
				expect(res.body.meetup).to.be.an('object');
				done();
			});
	});
	it('get a single meetup', (done) => {
		chai.request(app)
			.get('/api/v1/users/meetup/31')
			.set('Authorization', `Bearer ${anotherUserToken}`)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.eql('ok');
				expect(res.body.data).to.be.an('object');
				done();
			});
	});

	it('return 404 if no meetup found', (done) => {
		chai.request(app)
			.get('/api/v1/users/meetup/200')
			.set('Authorization', `Bearer ${faketoken}`)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.eql('error');
				done();
			});
	});
});

const updatSampleMeetup = {
	location: '20 oregun alen,yard 158',
	images: '/updated.jpeg',
	topic: 'updated',
	happeningon: '16 aug 2019, 10:00:am',
	tags: 'UI technology',
};

describe('Updates a meetUp', () => {
	it('should update a target meetup with the specified id', (done) => {
		chai.request(app)
			.put('/api/v1/users/meetup/31')
			.set('Authorization', `Bearer ${anotherUserToken}`)
			.send(updatSampleMeetup)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.eql('success');
				done();
			});
	});
	it('should return 404 if id not found', (done) => {
		chai.request(app)
			.put('/api/v1/users/meetup/99')
			.set('Authorization', `Bearer ${anotherUserToken}`)
			.send(updatSampleMeetup)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.eql('error');
				done();
			});
	});
});

describe('Delete  a meetUp', () => {
	it('should delete a meetup with a specific id', (done) => {
		chai.request(app)
			.delete('/api/v1/users/meetup/120')
			.set('Authorization', `Bearer ${anotherUserToken}`)
			.send(updatSampleMeetup)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.eql('success');
				done();
			});
	});
	it('should return 404 if id not found', (done) => {
		chai.request(app)
			.delete('/api/v1/users/meetup/99')
			.set('Authorization', `Bearer ${anotherUserToken}`)
			.send(updatSampleMeetup)
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body.status).to.be.eql('error');
				done();
			});
	});
});
