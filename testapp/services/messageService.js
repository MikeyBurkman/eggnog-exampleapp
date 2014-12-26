module.exports = {
	import: [
		'services.threadService'
	],
	init: init
};

function init(imports) {
	console.log('intializing message service: ', imports.all());
	var threadService = imports.get('services.threadService');

	return {
		something: function() {
			console.log('Calling messageService.something');
			return threadService.stuff;
		}
	};
}