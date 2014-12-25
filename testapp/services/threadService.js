module.exports = {
	import: [],
	init: init,
	scope: 'instance'
};

var id = 1;
function init(imports) {
	console.log('initializing thread service: ', imports);

	var myId = id++;
	console.log('this thread service ID: ', myId);

	return {
		stuff: 'This is my ID: ' + myId
	};
}