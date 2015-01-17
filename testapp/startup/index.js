module.exports = {
	isMain: true,
	imports: [
		'services.messageService',
		'services.threadService'
	],
	init: init
};

function init(eggnog) {
	console.log('Initializing appstart');

	var messageService = eggnog.import('services.messageService');
	var threadService = eggnog.import('services.threadService');

	console.log('result of calling messageService.something: ', messageService.something());

	eggnog.exports = true;
}