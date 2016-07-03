// ./server_app/server.js

// BASE SETUP
// =============================================================================

var express = require('express');           // express
var app = express();                    // define app
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var User = require('./models/users');
var colors = require('colors');            // use colors in console
var jwt = require('jsonwebtoken');

mongoose.connect(config.database);

app.set('superSecret', config.secret);

app.use(morgan('dev'));                             // use morgan to log requests to the console
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ROUTES
// =============================================================================

var port = process.env.PORT || 9001;                // port
var router = express.Router();

router.use(function (req, res, next) {
    //Allow CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //Response type
    res.setHeader("Content-Type", "application/json");

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    console.log(config.allowedUrls.indexOf(req.url),req.url, config.allowedUrls);

    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else if(config.allowedUrls.indexOf(req.url) === -1) {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    } else {
        next();
    }


});

/**
 * home route (GET http://localhost:9001/api) with instructions
 */
router.get('/', function (req, res) {
    res.json({
        message: 'howdy! api is running!',
        users: {
            getAllUsers: 'GET:       /api/users - Get all the users.',
            createUser: 'POST:      /api/users - Create a user.',
            getUserById: 'GET:       /api/users/:userId  Get a single user.',
            updateUserById: 'PUT:       /api/users/:userId  Update a user with new info.',
            deleteUserById: 'DELETE:    /api/users/:userId  Delete a user.'
        },
        authenticate: {
            authenticate: 'POST:      /api/authenticate - send username and password to get token'
        }
    });
});

/**
 * Users rest service
 */
router.route('/users')
// create a users (accessed at POST http://localhost:9001/api/users)
    .post(function (req, res) {

        //EXAMPLE:
        //{"name" : "User X", "username" : "user1", "password" : "user1", "admin" : "false", "location" : "Vilnius"}

        var user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            admin: req.body.admin,
            location: req.body.location,
            meta: req.body.meta,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at
        });

        // save the user and check for errors
        user.save(function (err) {
            if (err) {
                console.log('ERROR CREATING USER: ' + err.errmsg.red);
                res.status(500).json({error: err});
            } else {
                console.log('SUCCESS CREATING USER: ' + user.name.blue);
                res.status(200).json({message: 'User created!'});
            }
        });

    })
    //Get all users
    .get(function (req, res) {
        User.find(function (err, users) {
            if (err) {
                console.log('ERROR GETTING USERS: ' + err.errmsg.red);
                res.status(500).json({error: err});
            } else {
                console.log('SUCCESS GETTING USERS'.green);
                res.status(200).json(users);
            }
        });
    });

router.route('/users/:user_id')
// get the bear with that id (accessed at GET http://localhost:9001/api/users/:user_id)
    .get(function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err) {
                console.log('ERROR GETTING USER: ' + err.errmsg.red);
                res.status(500).json({error: err});
            } else {
                console.log('SUCCESS GETTING USER'.green + (' id:' + req.params.user_id).red);
                res.status(200).json(user);
            }
        });
    })
    .put(function (req, res) {

        // update user by id
        User.findById(req.params.user_id, function (err, user) {

            if (err) {
                console.log('ERROR UPDATING USER: ' + err.errmsg.red);
                res.status(500).json({error: err});
                return 0;
            }

            for (var key in req.body) {
                user[key] = req.body[key];
            }

            // save the bear
            user.save(function (err) {
                if (err) {
                    console.log('ERROR UPDATING USER: ' + err.errmsg.red);
                    res.status(500).json({error: err});
                } else {
                    console.log('SUCCESS UPDATING USER'.green);
                    res.status(200).json({success: 'User is updated'});
                }
            });

        });
    })
    .delete(function (req, res) {
        User.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err) {
                console.log('ERROR DELETING USER: ' + err.errmsg.red);
                res.status(500).json({error: err});
            } else {
                console.log('SUCCESS DELETING USER'.green + (' id:' + req.params.user_id).red);
                res.status(200).json({message: 'Successfully deleted user'});
            }
        });
    });

/**
 * Authenticate rest service
 */

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function (req, res) {

    // find the user
    User.findOne({
        username: req.body.username
    }, function (err, user) {

        if (err) {
            console.log('ERROR AUTH USER: ' + err.errmsg.red);
            res.status(403).json({error: err});
            return;
        }

        if (!user) {
            res.json({success: false, message: 'Authentication failed. User not found.'});
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({success: false, message: 'Authentication failed. Wrong password.'});
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Token is set!',
                    token: token
                });
            }

        }

    });
});

// REGISTER ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
var logMessage = 'API is running on: http://localhost:' + port + '/api';
console.log(logMessage.green);

