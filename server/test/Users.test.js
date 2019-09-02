import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';


const { expect } = chai;
chai.use(chaiHttp);

const User = {
	email: 'testProf@gmail.com',
	password: 'test123'
};


const mainUser = {
	email: 'admin@gmail.com',
	password: 'Admins123'
};

let anotherUserToken;

before((done) => {
	chai.request(app)
		.post('/api/v1/users/signup')
		.send(mainUser)
		.end((err, res) => {
			anotherUserToken = res.body.token;
			done();
		});
});

describe('POST  /signup', () => {
	it('should return 201 and create new user', (done) => {
		chai.request(app)
			.post('/api/v1/users/signup')
			.send(User)
			.end((err, res) => {
				// console.log('>>>>User', res);
				expect(res).to.have.status(201);
				expect(res.body.status).to.be.eql(201);
				expect(res.body.message).to.be.eql('success');
				expect(res.body.data).to.be.an('object');
				done();
			//	console.log(res)
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
				anotherUserToken = res.body.token;
				expect(res).to.have.status(200);
				done();
			});
	});
});

const fakeUser = {
	email: 'segzy@gmail.com',
	password: 'segzy123'
};
let faketoken;

describe('Get userProfile', () => {
	it('get a user profile after a succesful login', (done) => {
		chai.request(app)
			.get('/api/v1/users/login/profile')
			.set('Authorization', `Bearer ${anotherUserToken}`)
			.end((err, res) => {
				console.log('userrrr', res);
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.eql(200);
				expect(res.body.profile).to.be.an('object');
				done();
			});
	});

	it('should return 404 if userId is not correct', (done) => {
		chai.request(app)
			.get('/api/v1/users/login/profile')
			.set('Authorization', `Bearer ${faketoken}`)
			.end((err, res) => {
				expect(res).to.have.status(401);
				done();
			});
	});
});

const updateUser = {
	firstname: '@Admin',
	lastname: 'SuperUser',
	othername: 'Moderator',
	phonenumber: '+23470686945',
	username: '@Admin'
};


describe('Updates  Profile', () => {
	it('Updates user profile if user is loggedIn', (done) => {
		chai.request(app)
			.put('/api/v1/users/UpdateProfile')
			.set('Authorization', `Bearer ${anotherUserToken}`)
			.send(updateUser)
			.end((err, res) => {
				console.log('>>>', res);
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.eql(200);
				expect(res.body.profileInfo).to.be.an('object');
				done();
			});
	});


	it('should return 401 if email is not found ', (done) => {
		chai.request(app)
			.put('/api/v1/users/UpdateProfile')
			.set('Authorization', `Bearer ${faketoken}`)
			.send(updateUser)
			.end((err, res) => {
				console.log('>>>', res);
				expect(res).to.have.status(401);
				done();
			});
	});
});
