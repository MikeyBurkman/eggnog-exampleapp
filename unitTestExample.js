
var eggnog = require('eggnog');

// To demonstrate unit testing:
// Require a single file, and give a mapping of each dependency for the imports.

var messageService = __dirname + '/testapp/services/messageService.js';
var testMessageService = eggnog.singleModule(messageService, {
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
var testOutput = testMessageService.something();
console.log('messageService output = ', testOutput); // Should be 'this is a test message!'