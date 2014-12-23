module.exports = {
	import: [],
	init: init,
	scope: 'instance'
};

var id = 1;
function init(imports) {
	console.log('thread service! ', id++);
	return {
		stuff: 'This is some stuff!'
	};
}