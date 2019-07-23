import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
const {expect} = chai;

chai.use(chaiHttp);
chai.should();
chai.expect();


const Inputs ={
	email:'example@gmail.com',
	password:'Admin123',
};


let InputsToken;
before((done)=>{
	chai.request(app)
		.post('/api/v1/users/login')
		.send(Inputs)
		.end((req, res )=>{
			InputsToken = res.body.token;
			done();
		});

})

describe('POST validates SignUp', () => {
it('should return 400 if all inputs are empty', (done) => {
		chai.request(app)
			.post('/api/v1/users/signup')
			.send({
				email:'',
				password:'',
				confirmPass:'',
				username:''			})
			.end((err, res)=>{
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.eql('error');
				done();
			});
	});

it('should return 400 if confirmPass does not match password', (done) => {
		chai.request(app)
			.post('/api/v1/users/signup')
			.send({
				password:'Admin123',
				confirmPass:'Admin',
})
			.end((err, res)=>{
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.eql('error');
				done();
			});
	});
it('should return 400 if password less than six characters', (done) => {
		chai.request(app)
			.post('/api/v1/users/signup')
			.send({
				email:'example@gmail.com',
				password:'Admin',
				confirmPass:'Admin',
				username:'admin@meetup'
			})
			.end((err, res)=>{
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.eql('error');
				expect(res.body.msg).to.be.eql('password length too short');
				done();
			});
	});

});

const signInputs ={
	email:'example@gmail.com',
	password:'Admin123'
}

let Token;
before((done)=>{
	chai.request(app)
		.post('/api/v1/users/login')
		.send(signInputs)
		.end((req, res )=>{
			Token = res.body.token;
			done();
		});
	})
describe('POST /validates login', () => {
	it('should return 400 if email and password are empty', (done) => {
		chai.request(app)
			.post('/api/v1/users/login')
			.send({
				email:'',
				password:'',
			})
			.end((err, res)=>{
				expect(res).to.have.status(400);
				expect(res.body.status).to.be.eql('error');
				expect(res.body.msg).to.be.eql('email and password required');

				done();
			});
	});
});