eggnog-exampleapp
=================

### Example usage of eggnog dependency injection.

`node index.js`

This starts up a small Express.js server
Navigate to http://localhost:3000 to see the readme for eggnog.
Navigate to http://localhost:3000/:user/:project, where user and project are a Github username and project. (For instance, http://localhost:3000/MikeyBurkman/eggnog)

### Unit Testing

`mocha`

There is nothing special with how Mocha is run. (Assuming that Mocha is installed, of course.) Mocha will automatically scan the `test/` directory for tests.

In each test file, a TestContext is created, and the system under test (sut) is created with mock dependencies. Each test is then executed against that sut.

(Note: The unit tests are currently under work. Writing unit tests for files that use bluebird and request are not trivial.)
