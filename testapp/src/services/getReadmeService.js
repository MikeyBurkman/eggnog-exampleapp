module.exports = {
	requires: [
		'lib::request',
		'lib::bluebird',
		'services/endpoints',
		'util/logger'
	],
	init: init
}

function init(endpoints, logger, request) {

	var Promise = this.require('lib::bluebird');

	this.exports = {
		getReadme: getReadme
	};

	function getReadme(user, project) {
		return new Promise(function(resolve, reject) {
			var path = endpoints.github + '/' + user + '/' + project + '/master/README.md';
			request(path, function (error, response, body) {
				logger.debug('readme path = ', path);
				if (error) {
					reject(error);
				} else if (response.statusCode >= 400) {
					reject(response.statusCode + ' : ' + body);
				} else {
					resolve(body);
				}
			});
		});
	}
}
