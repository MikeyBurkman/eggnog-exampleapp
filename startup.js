
var eggnog = require('eggnog')

var ctx = eggnog.newContext({
	externalRoot: __dirname
});
var root = __dirname + '/testapp/src';

ctx.scanForFiles(root);

ctx.main();
