
var eggnog = require('eggnog');

// First demonstrate how an app might use eggnog.
// Create a new eggnog context, and load in all files in the app diretory
var context = eggnog.newContext();
var root = __dirname + '/testapp';

// Here we're scanning for files in both services and startup. Because the baseDir is
//	not assumed to be part of the ID for each module, we manually set that as the prefix.
// If we had instead just scanned for all files in the base directory, services and 
//	startup would have been picked up automatically, and we would not need the prefix.
context.scanForFiles({
	baseDir: root + '/services',
	idPrefix: 'services'
});

context.scanForFiles({
	baseDir: root + '/startup',
	idPrefix: 'startup'
});

// Alternatively, we could just scan for the root directory if we want everything.
// This is simpler, but obviously less flexible
//context.scanForFiles(root);

// Assuming one of those modules loaded was desginated as a main module, we can do this.
// The return value is the return value of the init() method on the main module.
var startup = context.main();
console.log('Startup successful: ', startup);
