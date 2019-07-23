import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
const {expect} = chai;

chai.use(chaiHttp);
chai.should();
chai.expect();


const User = {
	email:'user@gmail.com',
	password:'new123',
	username:'AdminUser'
};

const UserMain ={
	email:'UserMain@gmail.com',
	password:'userpass',
	username:'IamAdmin'
};
let UserToken;
before((done)=>{
	chai.request(app)
		.post('/api/v1/users/signup')
		.send(UserMain)
		.end((req, res)=>{
			UserToken = res.body.token;
			done();
		}); 
});


describe('POST  /signup', ()=>{
it('should return 201 and create new user', (done)=>{
		chai.request(app)
			.post('/api/v1/users/signup')
			.send(User)
			.end((err, res) =>{
				expect(res).to.have.status(201);
				expect(res.body.data).to.be.an('object');
				done();
			});
	});
it('should return 409 and user already exist in the database message', (done)=>{
		chai.request(app)
			.post('/api/v1/users/signup')
			.send(User)
			.end((err, res) =>{
				expect(res).to.have.status(409);
				expect(res.body.msg).to.be.eql('user already exist in the database');
				done();
			});

	});

});