module.exports = {
	imports: [
		'services.threadService'
	],
	extImports: [
		'fs'
	],
	init: init
};

function init(eggnog) {
	console.log('intializing message service');
	var threadService = eggnog.import('services.threadService');
	var fs = eggnog.import('fs');

	console.log('messageService: files in my directory: ', fs.readdirSync(__dirname));

	eggnog.exports = {
		something: function() {
			console.log('Calling messageService.something');
			return threadService.stuff;
		}
	};
}