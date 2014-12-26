module.exports = {
	isMain: true,
	import: [
		'services.messageService',
		'services.threadService'
	],
	init: init
};

function init(imports) {
	console.log('Initializing appstart: ', imports.all());

	var messageService = imports.get('services.messageService');
	var threadService = imports.get('services.threadService');

	console.log('result of calling messageService.something: ', messageService.something());

	return true;
}