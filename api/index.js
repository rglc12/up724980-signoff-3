var express = require('express');
var GoogleAuth = require('simple-google-openid');
var bodyParser = require('body-parser');
var api = express.Router();

api.use(GoogleAuth("511406985315-3rk44gqt9ri26bkkchmi1um20ielribc.apps.googleusercontent.com"));

api.use('*', GoogleAuth.guardMiddleware({ realm: 'jwt' }));

//Users and their roles on the application

var users = [

    {
        'email': 'up724980@myport.ac.uk',
        'roles': ['admin', 'user']

    }
];

/*
    Functions
 */

// Checks the array for a user. If they exist within the array, their data is returned, otherwise a new entry is created
function currentUser(req){

    var entry = req.user.emails[0].value;
    for(var i = 0; i < users.length; i++) {

        if(users[i].email == entry) {

            return users[i];

        }
    }

    var userEntry = {
        'email': entry,
        'roles': [],
        'authorise': false
    };

    users.push(userEntry);
    return userEntry;
}

// Validation check to see if a user has the role of 'user'
function isUser(user){

    return !!user.roles.includes('user');

}

// Validation check to see if a user has the role of 'admin'
function isAdmin(user){

    return !!user.roles.includes('admin');

}

// displays the roles of all the logged in users (from the user array)
api.get('/user/roles', (req, res) => {

    res.send(currentUser(req).roles);

})

// requests approval for logged-in user (no body)
api.post('/user/request', (req, res) => {

    currentUser(req).authorise = true;
    res.sendStatus(202);

})

// Once a user is authorised, this function will return a random number. If they're not authorised, there will be a 401 status returned.
api.get('/random', (req, res) => {

    if(isUser(currentUser(req))){

        res.set('Content-Type', 'text/plain');
        res.send(Math.random().toString());

    } else {

     res.sendStatus(403);

    }
})

// lists all known users
api.get('/users', (req, res) => {

    if(isAdmin(currentUser(req))) {

        res.send(users);

    } else {

        res.sendStatus(403);

    }
})

// lists approval requests
api.get('/user/request', (req, res) => {

    if(isAdmin(currentUser(req))) {

    var requests = [];
    for(var i = 0; i < users.length; i++) {

        if(users[i].authorise) {

            requests.push(users[i].email);

        }
    }

    res.send(requests);

    } else {

        res.sendStatus(403);

    }
})

// adds a user (email in the body)
api.post('/user/approve', bodyParser.text(), (req, res) => {

    if(isAdmin(currentUser(req))) {

    for(var i = 0; i < users.length; i++) {

        if(req.body == users[i].email) {

            users[i].roles.push('user');
            users[i].authorise = false;
            res.send(users[i]);
            return;
        }
    }

    res.sendStatus(404);

    } else {

        res.sendStatus(403);

    }
})

api.delete('/user/:email', (req, res) => {

    if(isAdmin(currentUser(req))) {

        users = users.filter((user) => {

            return user.email !== req.params.email;

        })

        res.sendStatus(204);

    } else {

        res.sendStatus(403);

    }
})

module.exports = api;