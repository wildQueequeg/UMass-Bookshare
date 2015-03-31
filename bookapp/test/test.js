var assert = require("assert")
var expect = require('expect')
var should = require('should')
var db = require('DB_Interface.js')
var err =new Error ('Not Found')
var fname, lname, password, email, school, phone;
// error = require('error.js')

describe('Sample test', function(){
describe('#indexOf()', function(){
it('should return -1 when the value is not present', function(){
assert.equal(-1, [1,2,3].indexOf(5));
assert.equal(-1, [1,2,3].indexOf(0));
})
})
})


describe ('loginUser', function(){
it ('should pass',function(done){
done();
});
})

describe('DB addUser', function(){
  it('add 3 users',function(done){
      db.addUser('aaa', 'bbb',1,'ccc','ddd','m','eee',111,'fff');
      db.addUser('bbb', 'bbb',1,'ccc','ddd','m','eee',111,'fff');
      db.addUser('ccc', 'bbb',1,'ccc','ddd','m','eee',111,'fff');
     // if (err) return done(err); 
      done();
    });

  describe('Find User added', function(){
    it('respond with matching records', function(done){
      db.findUser({ type: 'username' }, function(err, res){
       // if (err) return done(err);
        res.should.have.length(3);
        done();
      })
    })
  })
})

function add() {
  return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
    return prev + curr;
  }, 0);
}

describe('add()', function() {
  var tests = [
    {args: [1, 2],       expected: 3},
    {args: [1, 2, 3],    expected: 6},
    {args: [1, 2, 3, 4], expected: 10}
  ];

  tests.forEach(function(test) {
    it('correctly adds ' + test.args.length + ' args', function() {
      var res = add.apply(null, test.args);
      assert.equal(res, test.expected);
    });
  });
});

// it("Should fetch test.html", function(done) {
//     console.log("test1");
//     var body = "";
//     http.get({host: "localhost", port:8100, path: "/"}, function(res) {
//         res.on('data', function(chunk) {
//             // Note: it might be chunked, so need to read the whole thing.
//             body += chunk;
//         });
//         res.on('end', function() {
//             assert.ok(body.toString().indexOf("<a href='/dummy.txt'>") !== -1);
//             assert.equal(res.statusCode, 200);
//             done();
//         });
//     })
// });

// it("Should fetch dummy.txt", function(done) {
//     http.get({host: "localhost", port:8100, path: "/dummy.txt"}, function(res) {
//         res.on('data', function(body) {
//             assert.equal(res.statusCode, 200);
//             assert.ok(body.toString().indexOf("test") === 0);
//             done();
//         });
//     });
// });

// it("Should get 404", function(done) {
//     http.get({host: "localhost", port:3000, path: "/qwerty"}, function(res) {
//         assert.equal(res.statusCode, 404);
//         done();
//     });
// });
