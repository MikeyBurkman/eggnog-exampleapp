module.exports = {
	isMain: true,
	import: [
		'services.messageService',
		'services.threadService'
	],
	init: init
};

function init(imports) {
	console.log('Initializing appstart: ', imports);

	var messageService = imports['services.messageService'];
	var threadService = imports['services.threadService'];

	console.log('result of calling messageService.something: ', messageService.something());

	return true;
}