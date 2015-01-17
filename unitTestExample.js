
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
		'fs': {
			readdirSync: function(dir) {
				// Could validate dir here... probably not a good example really
				// For now, just demonstrate that we can return our own value
				return ['testDirectory']; 
			}
		}
	}
});
var testOutput = testMessageService.something();
console.log('messageService output = ', testOutput); // Should be 'this is a test message!'