
var eggnog = require('../eggnog');

// To demonstrate unit testing:
// Require a single file, and give a mapping of each dependency for the imports.
var context = eggnog.newSingleModuleContext(__dirname + '/testapp/src');

function testLogger() {
	var mockConsole = {
		log: function(msgPrefix, msg) {
			assertEqual('DEBUG: test message', msgPrefix + msg);
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
				assertEqual('https://raw.githubusercontent.com/MikeyBurkman/eggnog/master/README.md', url);
				callback(undefined, {statusCode: 200}, testResponseBody);
			}
		}
	});

	var actualResp = testService.getReadme('MikeyBurkman', 'eggnog');
	assertEqual(expectedFunctionResponse, actualResp);

	console.log('testServiceSuccess successful');
}

testLogger();
testServiceSuccess();

function mockQ(expectError, expectResult, promiseResponse) {
	var defer = function() {
		return {
			resolve: function(actualResult) {
				if (expectError || actualResult !== expectResult) {
					throw 'Unexpected Q resolve: ' + r;
				}
			},
			reject: function(actualResult) {
				if (!expectError || actualResult !== expectResult) {
					throw 'Unexepected Q reject: ' + r;
				}
			},
			promise: promiseResponse
		}
	};
	return {
		defer: defer
	};
}

function assertEqual(expected, actual) {
	if (actual !== expected) {
		throw 'Unexpected result: ' + actual + '; expected: ' + expected;
	}
}
