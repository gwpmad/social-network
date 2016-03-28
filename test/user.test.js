"use strict";

let should = require('should'),
  mongoose = require('mongoose'),
  Account = require('../app/models/account.js'),
  db;

describe('Account', function() {
  before(function(done) {
    db = mongoose.connect('mongodb://localhost/test');
    done();
  })

  after(function(done) {
    mongoose.connection.close();
    done();
  });

  beforeEach(function(done) {
    let account = new Account({
      username: '12345',
      password: 'testy'
    });

    account.save(function(error) {
      if(error) console.log('error' + error.message);
      else console.log('no error');
      done();
    });
  });

  it('find a user by username', function(done) {
    Account.findOne({username: '12345'}, function(error, account) {
      account.username.should.eql('12345');
      console.log("username: ", account.username);
      done();
    });
  });

  afterEach(function(done) {
    Account.remove({}, function() {
      done();
    });
  });
});
