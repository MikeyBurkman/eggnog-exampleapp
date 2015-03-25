
var eggnog = require('../eggnog');

// To demonstrate unit testing:
// Require a single file, and give a mapping of each dependency for the imports.
var context = eggnog.newSingleModuleContext(__dirname + '/testapp/src');

function testLogger() {
	var mockConsole = {
		log: function(msgPrefix, msg) {
			if (msgPrefix + msg != 'DEBUG: test message') throw ('Wrong input! ' + msg);
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

function testService() {
	// TODO Complete this
	var testService = context.buildModule('services.getReadmeService', {
		imports: {
			'services.threadService': {
				stuff: 'this is a test message!'
			}
		},
		extImports: {
			'request': function(url, callback) {
				if (url != 'https://raw.githubusercontent.com/MikeyBurkman/eggnog/master/README.md') {
					throw 'Unexpected url: ' + url;
				}

				callback(undefined, undefined, 'Test response body');
			}
		}
	});
}

testLogger();
testService();
