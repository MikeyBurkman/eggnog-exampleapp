module.exports = {
	isMain: true,
	locals: [
		'util.logger',
		'services.getReadmeService'
	],
	externals: [
		'express'
	],
	init: init
};

function init(eggnog) {
	var express = eggnog.import('express');
	var readmeService = eggnog.import('services.getReadmeService');
	var logger = eggnog.import('util.logger');

	var app = express();

	app.get('/', function(req, res) {
		getReadme('MikeyBurkman', 'eggnog', res);
	});

	app.get('/:user/:project', function(req, res) {
		var user = req.params.user;
		var project = req.params.project;
		getReadme(user, project, res);
	});

	function getReadme(user, project, response) {
		readmeService
			.getReadme(user, project)
			.then(function(readme) {
				logger.debug('Got readme back for ', user, ':', project);
				response.send(readme);
			})
			.catch(function(err) {
				logger.error('Error getting readme for ', user, ':', project, ' :: ', err);
				response.status = 500;
				response.send('ERROR!!! ' + err);
			});
	}

	app.listen(3000);
	logger.debug('started server on port: 3000');

}