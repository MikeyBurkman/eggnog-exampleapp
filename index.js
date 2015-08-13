
var eggnog = require('eggnog')

var ctx = new eggnog.Context({
  srcDirectory: __dirname + '/testapp/src',
  nodeModulesAt: __dirname
});

ctx.main();
