
var eggnog = require('eggnog');
var expect = require('expect.js');
var spy = require('spy');

describe('getReadmeService tests', function() {
  var context = new eggnog.TestContext('./src');

  var mockBluebird = spy();
  var mockRequest = spy();
  var sut = context.createModule('services/getReadmeService', {
    'util/logger': {debug: function() {}}, // Don't care
    'services/endpoints.github': 'http://something.com',
    'lib::request': mockRequest,
    'lib::bluebird': mockBluebird
  });

  it('Success response implemented correctly', function(done) {

    // TODO: Figure out good way to mock up bluebird promises and request's callbacks
    // :D
    done();

  });

});
