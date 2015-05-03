
var eggnog = require('eggnog')

var ctx = eggnog.newContext({
	nodeModulesAt: __dirname
});

ctx.addDirectory(__dirname + '/testapp/src');

ctx.main();
