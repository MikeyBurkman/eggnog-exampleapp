module.exports = {
	imports: [],
	extImports: ['request', 'fs'],
	init: init,
	scope: 'instance'
};

var id = 1;
function init(eggnog) {
	console.log('initializing thread service');

	var myId = id++;
	console.log('this thread service ID: ', myId);

	var fs = eggnog.import('fs');
	console.log('Thread service: files in my directory: ', fs.readdirSync(__dirname));

	var request = eggnog.import('request');
	request('https://raw.githubusercontent.com/MikeyBurkman/eggnog/master/README.md', function (error, response, body) {
	  if (!error) {
	    console.log('Got server response, external dependency is good!');
	  } else {
	  	console.log('Error calling request framework... ', error);
	  }
	});

	eggnog.exports = {
		stuff: 'This is my ID: ' + myId
	};
}