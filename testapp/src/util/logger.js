module.exports = {
	globals: ['console'],
	init: init
}

function init(eggnog) {

	eggnog.exports = {
		debug: debug,
		error: error
	};
	
	var console = eggnog.global('console');

	function debug() {
		console.log.apply(console, prependArgs('DEBUG: ', arguments));
	}

	function error() {
		console.log.apply(console, prependArgs('ERROR: ', arguments));
	}

	function prependArgs(x, args) {
		var argsArray = Array.prototype.slice.call(args);
		argsArray.unshift(x);
		return argsArray;
	}
}