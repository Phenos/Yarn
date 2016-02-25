var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
var path = require('path');

// Passport Configurator for OAuth with Facebook and Twitter
var PassportConfigurator = require('loopback-component-passport').PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

/*
 * body-parser is a piece of express middleware that
 *   reads a form's input and stores it as a javascript
 *   object accessible through `req.body`
 *
 */
var bodyParser = require('body-parser');

/**
 * Flash messages for passport
 *
 * Setting the failureFlash option to true instructs Passport to flash an
 * error message using the message given by the strategy's verify callback,
 * if any. This is often the best approach, because the verify callback
 * can make the most accurate determination of why authentication failed.
 */
var flash = require('express-flash');


// Load the provider configurations
var config = {};
try {
    config = require('./providers.json');
} catch (err) {
    console.error('Please configure your passport strategy in `providers.json`.');
    console.trace(err);
    process.exit(1);
}


// Setup the view engine (jade)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
var appRoot = __dirname;
console.log("Loading api app from :" + appRoot);


// Inject the current user in the context
app.use(loopback.context());
app.use(loopback.token());
app.use(function setCurrentUser(req, res, next) {
    if (!req.accessToken) {
        return next();
    }
    app.models.user.findById(req.accessToken.userId, function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(new Error('No user with this access token was found.'));
        }
        //console.log("found user", user);
        var loopbackContext = loopback.getCurrentContext();
        if (loopbackContext) {
            loopbackContext.set('currentUser', user);
        } else {
            console.log("no current context?");
        }
        next();
    });
});



app.start = function () {
    app.set('port', (process.env.PORT || 5000));

    // start the web server
    return app.listen(function () {
        app.emit('started');
        var baseUrl = app.get('url').replace(/\/$/, '');
        console.log('Web server listening at: %s', baseUrl);
        if (app.get('loopback-component-explorer')) {
            var explorerPath = app.get('loopback-component-explorer').mountPath;
            console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
        }
    });
};

boot(app, appRoot, function (err) {
    if (err) throw err;

    // start the server if `$ node server.js`
    if (require.main === module)
        app.start();
});

// to support URL-encoded bodies
app.middleware('parse', bodyParser.urlencoded({
    extended: true
}));

// The access token is only available after boot
app.middleware('auth', loopback.token({
    model: app.models.accessToken
}));

app.middleware('session:before', loopback.cookieParser(app.get('cookieSecret')));
app.middleware('session', loopback.session({
    secret: 'kitty',
    saveUninitialized: true,
    resave: true
}));
passportConfigurator.init();


// We need flash messages to see passport errors
app.use(flash());

// Set up related models
passportConfigurator.setupModels({
    userModel: app.models.user,
    userIdentityModel: app.models.userIdentity,
    userCredentialModel: app.models.userCredential
});

// Configure passport strategies for third party auth providers
for (var s in config) {
    var c = config[s];
    c.session = c.session !== false;
    passportConfigurator.configureProvider(s, c);
}

var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


app.get('/home', function (req, res, next) {
    res.render('pages/index', {
        user: req.user,
        url: req.url
    });
});

app.get('/auth/account', ensureLoggedIn('/login'), function (req, res, next) {
    res.render('pages/loginProfiles', {
        user: req.user,
        url: req.url
    });
});

app.get('/auth/account/json', function (req, res, next) {
    var data = req.user || {};
    res.send(data);
});

app.get('/link/account', ensureLoggedIn('/login'), function (req, res, next) {
    res.render('pages/linkedAccounts', {
        user: req.user,
        url: req.url
    });
});


app.get('/local', function (req, res, next) {
    res.render('pages/local', {
        user: req.user,
        url: req.url
    });
});

app.get('/signup', function (req, res, next) {
    res.render('pages/signup', {
        user: req.user,
        url: req.url
    });
});

app.post('/signup', function (req, res, next) {

    var user = app.models.user;

    var newUser = {};
    newUser.email = req.body.email.toLowerCase();
    newUser.username = req.body.username.trim();
    newUser.password = req.body.password;

    User.create(newUser, function (err, user) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('back');
        } else {
            // Passport exposes a login() function on req (also aliased as logIn())
            // that can be used to establish a login session. This function is
            // primarily used when users sign up, during which req.login() can
            // be invoked to log in the newly registered user.
            req.login(user, function (err) {
                if (err) {
                    req.flash('error', err.message);
                    return res.redirect('back');
                }
                //return res.redirect('/auth/account');
                return res.redirect('/');
            });
        }
    });
});

app.get('/login', function (req, res, next) {
    res.render('pages/login', {
        user: req.user,
        url: req.url
    });
});

app.post('/login', function (req, res) {
    User.login({
        email: req.body.email,
        password: req.body.password
    }, 'user', function (err, token) {
        if (err) {
            res.render('response', { //render view named 'response.ejs'
                title: 'Login failed',
                content: err,
                redirectTo: '/',
                redirectToLinkText: 'Try again'
            });
            return;
        }

        res.render('home', { //login user and render 'home' view
            email: req.body.email,
            accessToken: token.id
        });
    });
});

// HAck to de-obfuscate cookies ?
app.get('/auth/login', function (req, res, next) {
    //workaround for loopback-password
    //without this angular-loopback would make incorrect authorization header
    res.cookie('access-token-plain', req.signedCookies['access_token']);
    res.cookie('userId-plain', req.user.id);
    res.cookie('username-plain', req.user.username);
    res.redirect('/#auth/login');
});

app.get('/auth/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});






// -- Mount static files here--
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
// Example:
var path = require('path');
//app.use(loopback.static(path.resolve(__dirname, '../../build/static')));

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
//app.use(loopback.urlNotFound());

// The ultimate error handler.
app.use(loopback.errorHandler());



