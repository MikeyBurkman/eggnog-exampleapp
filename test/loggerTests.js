
var eggnog = require('eggnog');
var expect = require('expect.js');
var spy = require('spy');

describe('logger tests', function() {
  var context = new eggnog.TestContext('./src');

  var mockConsole = {
    log: spy()
  };

  beforeEach(function() {
    mockConsole.log.reset();
  })

  var sut = context.createModule('util/logger', {
    'global::console': mockConsole
  });

  it('Implements debug() correctly', function() {
  	sut.debug('test debug message');

    expect(mockConsole.log.calledWith('DEBUG: ', 'test debug message'));
  });

  it('Implements error() correctly', function() {
    sut.debug('test error message');

    expect(mockConsole.log.calledWith('ERROR: ', 'test error message'));
  });

});
