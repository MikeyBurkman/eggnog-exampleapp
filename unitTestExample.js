
var eggnog = require('eggnog');

// To demonstrate unit testing:
// Require a single file, and give a mapping of each dependency for the imports.

var messageService = __dirname + '/testapp/services/messageService.js';
var testMessageService = eggnog.singleModule(messageService, {
	'services.threadService': {
		stuff: 'this is a test message!'
	}
});
var testOutput = testMessageService.something();
console.log('messageService output = ', testOutput); // Should be 'this is a test message!'