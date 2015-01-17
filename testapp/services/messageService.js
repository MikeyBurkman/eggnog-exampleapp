module.exports = {
	imports: [
		'services.threadService'
	],
	extImports: [
		'request'
	],
	init: init
};

function init(eggnog) {
	console.log('intializing message service');
	var threadService = eggnog.import('services.threadService');
	
	var request = eggnog.import('request');
	request('https://raw.githubusercontent.com/MikeyBurkman/eggnog/master/README.md', function (error, response, body) {
	  if (!error) {
	    console.log('Message Service: Got server response, external dependency is good! \'', body.substring(0,12), '...\'');
	  } else {
	  	console.log('Message Service: Error calling request framework... ', error);
	  }
	});

	eggnog.exports = {
		something: function() {
			console.log('Calling messageService.something');
			return threadService.stuff;
		}
	};
}