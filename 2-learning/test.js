var sleep = require('co-sleep');
var co = require('co');
 
co(function *() {
  var now = Date.now();
  // wait for 1000 ms 
  yield sleep(1000);
  expect(Date.now() - now).to.not.be.below(1000);
})();