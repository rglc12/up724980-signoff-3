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
    API Functionality
 */

// Once a user is authorised, this function will return a random number. If they're not authorised, there will be a 401 status returned.
api.get('/random', (req, res) => {

    if(isUser(currentUser(req))){

    res.set('Content-Type', 'text/plain');
    res.send(Math.random().toString());

} else {

    res.sendStatus(403);

}
})

// Displays the roles of all the logged in users (from the user array)
api.get('/user/roles', (req, res) => {

    res.send(currentUser(req).roles);

})

// A user requests authorisation approval from admin
api.post('/user/request', (req, res) => {

    currentUser(req).authorise = true;
    res.sendStatus(202);

})

// Displays all users that exists from the user array
api.get('/users', (req, res) => {

    if(isAdmin(currentUser(req))) {

        res.send(users);

    } else {

        res.sendStatus(403);

    }
})

// Shows users that are pending authorisation access (Requesting approval from an admin user)
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

// Once a user/new user has been approved by admin, they are then added to the user array (email) with their role.
api.post('/user/approve', bodyParser.text(), (req, res) => {

    if(isAdmin(currentUser(req))) {

    for(var i = 0; i < users.length; i++) {

        if(req.body == users[i].email) {

            users[i].roles.push('user');
            //users[i].authorise = false;
            res.send(users[i]);
            return;
        }
    }

    res.sendStatus(404);

    } else {

        res.sendStatus(403);

    }
})

// Deletes an existing user with a valid email address. The array is searched for a specific email and then removes its entry
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

/*
 Functions
 */

// Checks the array for a user. If they exist within the array, their data is returned, otherwise a new entry is created
function currentUser(req){

    var userEmail = req.user.emails[0].value;
    for(var i = 0; i < users.length; i++) {

        if(users[i].email == userEmail) {

            return users[i];

        }
    }

    var userEntry = {
        'email': userEmail,
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

module.exports = api;