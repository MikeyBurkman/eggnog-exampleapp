module.exports = function(
	/* services/endpoints */ endpoints,
	/* util/logger */ logger,
	/* lib::request */ request,
	/* lib::bluebird */ Promise) {

	return function(user, project) {
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
};
