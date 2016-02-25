var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();

var PassportConfigurator = require('loopback-component-passport').PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);



var appRoot = __dirname;
console.log("Loading api app from :" + appRoot);
boot(app, appRoot, function (err) {
  if (err) throw err;
});

console.log("Configuring passport related models");
passportConfigurator.init();
// Set up related models
passportConfigurator.setupModels({
  userModel: app.models.user,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential
});

console.log("Starting auto-migration of models");
var dataSource = app.dataSources.db;

dataSource.automigrate('story', function(err) {
  if (err) throw err;
});

dataSource.automigrate('user', function(err) {
  if (err) throw err;
});

dataSource.automigrate('userCredential', function(err) {
  if (err) throw err;
});

dataSource.automigrate('userIdentity', function(err) {
  if (err) throw err;
});

dataSource.automigrate('accessToken', function(err) {
  if (err) throw err;
});

dataSource.automigrate('ACL', function(err) {
  if (err) throw err;
});

dataSource.automigrate('RoleMapping', function(err) {
  if (err) throw err;
});

dataSource.automigrate('Role', function(err) {
  if (err) throw err;
});

