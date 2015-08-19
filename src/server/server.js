module.exports = function(
	/* util/logger */ logger,
	/* services/getReadmeService */ svc,
	/* lib::express */  express) {

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
		svc(user, project)
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

	return app;

};
