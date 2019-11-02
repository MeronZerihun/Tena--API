var request = require('request');
var should = require('should');
var expect = require('chai').expect;
var baseUrl = "http://tena--app.herokuapp.com";
var util = require('util');


describe('return users', function(){
    it('return users', function(done){
        request.get({url: baseUrl + '/users'}, function (err, response, body){
            expect(response.statusCode).to.equal(200);
            done();
        })
    
    })
})