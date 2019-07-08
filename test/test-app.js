/* eslint-disable no-console */
/* eslint-disable no-undef */


import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

process.env.NODE_ENV = 'test';
// eslint-disable-next-line no-unused-vars
const { should, expect } = chai;
should();

chai.use(chaiHttp);

// const message = 'Welcome';

// eslint-disable-next-line no-undef
describe('Test if the user name is available', () => {
  it('it should list ALL users on /users GET', (done) => {
    chai.request(app)
      .get('/users')
      .end((err, res) => {
        res.should.have.status(200);
        // eslint-disable-next-line no-unused-expressions
        res.should.be.json;
        res.body.should.a('array');
        done();
      });
  });

  //  it('should list a SINGLE user on /users/:id GET');
  it('should add a SINGLE user on /users POST', (done) => {
    chai.request(app)
      .post('/users')
      .send({ firstName: 'busayo', lastName: 'walter', email: 'busayo7@gmail.com' })
      .end((err, res) => {
        if (err) {
          console.log('error');
          done(err);
        } else {
          console.log(res);
          done();
        }
        res.should.have.status(201);
        // eslint-disable-next-line no-unused-expressions
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.a.property('SUCCESS');
        res.body.SUCCESS.should.be.a('object');
        console.log(res.body);
        res.body.SUCCESS.should.have.property('firstName');
        res.body.SUCCESS.should.have.property('lastName');
        res.body.SUCCESS.should.have.property('email');
        res.body.SUCCESS.should.have.property('id');
        res.body.SUCCESS.firstName.should.equal('Godstime');
        res.body.SUCCESS.lastName.should.equal('Agho');
        res.body.SUCCESS.email.should.equal('busayo7@gmail.com');
        // done();
      });
  });
//   it('should update a SINGLE user on /users/:id PUT');
//   it('should delete a SINGLE user on /users/:id DELETE');
});
