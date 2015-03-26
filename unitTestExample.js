
var eggnog = require('eggnog');

// To demonstrate unit testing:
// Require a single file, and give a mapping of each dependency for the imports.
var context = eggnog.newSingleModuleContext(__dirname + '/testapp/src');

function testLogger() {
	var mockConsole = {
		log: function(msgPrefix, msg) {
			assertEqual('DEBUG: test message', msgPrefix + msg, 'debug message');
		}
	};

	var testLogger = context.buildModule('util.logger', {
		globals: {
			console: mockConsole
		}
	});

	testLogger.debug('test message');
	console.log('logger test successful');
}

function testServiceSuccess() {
	var expectedFunctionResponse = 'response!';
	var testResponseBody = 'test response body'
	var testService = context.buildModule('services.getReadmeService', {
		imports: {
			'util.logger': {
				debug: function() { }
			}
		},
		extImports: {
			'q': mockQ(false, testResponseBody, expectedFunctionResponse),
			'request': function(url, callback) {
				assertEqual('https://raw.githubusercontent.com/MikeyBurkman/eggnog/master/README.md', url, 'request url');
				callback(undefined, {statusCode: 200}, testResponseBody);
			}
		}
	});

	var actualResp = testService.getReadme('MikeyBurkman', 'eggnog');
	assertEqual(expectedFunctionResponse, actualResp, 'response promise');

	console.log('testServiceSuccess successful');
}

function testServiceFailure() {
	var expectedFunctionResponse = 'response!';
	var testError = 'test error'
	var testService = context.buildModule('services.getReadmeService', {
		imports: {
			'util.logger': {
				debug: function() { }
			}
		},
		extImports: {
			'q': mockQ(true, testError, expectedFunctionResponse),
			'request': function(url, callback) {
				assertEqual('https://raw.githubusercontent.com/MikeyBurkman/eggnog/master/README.md', url, 'request url');
				callback(testError, undefined, undefined);
			}
		}
	});

	var actualResp = testService.getReadme('MikeyBurkman', 'eggnog');
	assertEqual(expectedFunctionResponse, actualResp, 'response promise');

	console.log('testServiceFailure successful');
}

testLogger();
testServiceSuccess();
testServiceFailure();

function mockQ(expectError, expectedResult, promiseResponse) {
	var defer = function() {
		return {
			resolve: function(actualResult) {
				assertTrue(!expectError, 'Promise should have been rejected, but was resolved with [' + actualResult + ']');
				assertEqual(expectedResult, actualResult, 'Promise resolve result');
			},
			reject: function(actualResult) {
				assertTrue(expectError, 'Promise should have been resolved, but was rejected with [' + actualResult + ']');
				assertEqual(expectedResult, actualResult, 'Promise rejection result');
			},
			promise: promiseResponse
		}
	};
	return {
		defer: defer
	};
}

function assertTrue(cond, msg) {
	if (!cond) {
		throw 'Condition was false: ' + msg;
	}
}

function assertEqual(expected, actual, msg) {
	if (actual !== expected) {
		throw  'Unexpected result ' + (msg ? 'for [' + msg + ']' : '') + ': got [' + actual + ']; expected: [' + expected + ']';
	}
}
