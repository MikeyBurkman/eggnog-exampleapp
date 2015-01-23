module.exports = {
	imports: [
		'util.logger'
	],
	extImports: [
		'request',
		'q'
	],
	init: init
}

// constant
var github = 'https://raw.githubusercontent.com';

function init(eggnog) {

	var logger = eggnog.import('util.logger');

	eggnog.exports = {
		getReadme: getReadme
	};

	var request = eggnog.import('request');
	var q = eggnog.import('q');

	function getReadme(user, project) {
		var defer = q.defer();

		var path = github + '/' + user + '/' + project + '/master/README.md';
		request(path, function (error, response, body) {
			logger.debug('readme path = ', path);
			if (error) {
				defer.reject(error);
			} else if (response.statusCode >= 400) {
				defer.reject(response.statusCode + ' : ' + body);
			} else {
				defer.resolve(body);
			}
		});

		return defer.promise;
	}
}