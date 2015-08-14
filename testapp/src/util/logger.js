module.exports = {
	requires: [
		'global::console'
	],
	init: init
};

function init(console) {

	return {
		debug: debug,
		error: error
	};

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
};
