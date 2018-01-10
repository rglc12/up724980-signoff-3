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

 api.get('/random', async (req, res) => {

 if(req.user.displayName){

 res.set('Content-Type', 'text/plain');
 res.send(Math.random().toString());

 } else {

 res.sendStatus(403);

 }

 })
*/

// Helper functions
function currentUser(req){

    var reqEmail = req.user.emails[0].value;
    for(var i = 0; i < users.length; i++) {

        if(users[i].email == reqEmail) {

            return users[i];

        }
    }
    // If the user wasn't found, add them to the "database"
    var newUser = {
        'email': reqEmail,
        'roles': [],
        'requestedAccess': false
    };

    users.push(newUser);
    return newUser;
}

function isUser(user){

    return user.roles.indexOf('user') == 1; // If the user has 'user' in their roles array

}

function isAdmin(user){

    return user.roles.indexOf('admin') == 0; // If the user has 'admin' in their roles array

}

// retrieves roles of logged-in user
api.get('/user/roles', (req, res) => {

    res.send(currentUser(req).roles);

})

// requests approval for logged-in user (no body)
api.post('/user/request', (req, res) => {

    currentUser(req).requestedAccess = true;
    res.sendStatus(202);

})

// Once a user is authorised, this function will return a random number. If they're not authorised, there will be a 401 status returned.
api.get('/random', (req, res) => {

    if(isUser(currentUser(req))){

        res.set('Content-Type', 'text/plain');
        res.send('' + Math.random());

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

    var userRequests = [];
    for(var i = 0; i < users.length; i++) {

        if(users[i].requestedAccess) {

            userRequests.push(users[i].email);

        }
    }

    res.send(userRequests);

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
            users[i].requestedAccess = false;
            res.send(users[i]);
            return;
        }
    }

    res.sendStatus(404);

    } else {

        res.sendStatus(403);

    }
})

api.delete('/user/:id', (req, res) => {

    if (isAdmin(req)) {

        users = users.filter((user) => {return user.email !== req.params.id;})
        res.sendStatus(204);

    } else {

        res.sendStatus(403);

    }
})

module.exports = api;