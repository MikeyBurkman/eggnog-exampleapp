eggnog-exampleapp
=================

### Example usage of eggnog dependency injection.

`node startup.js`

This starts up a small Express.js server
Navigate to http://localhost:3000 to see the readme for eggnog.
Navigate to http://localhost:3000/:user/:project, where user and project are a Github username and project. (For instance, http://localhost:3000/MikeyBurkman/eggnog)

### Unit Testing

`node unitTestExample.js`

The unit test file shows how you can create a context capable of creating single modules, where you can directly specify the dependency implementations that the module will use.

For instance, you can provide a module with mock dependencies for verifying that everything is called correctly.

(This example shows how you test individual dependencies. It is strongly recommended that you use a proper unit testing framework.)
