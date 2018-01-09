var express = require('express');
var GoogleAuth = require('simple-google-openid');
var bodyParser = require('body-parser');
var api = express.Router();

api.use(GoogleAuth("511406985315-3rk44gqt9ri26bkkchmi1um20ielribc.apps.googleusercontent.com"));

api.use('*', GoogleAuth.guardMiddleware({ realm: 'jwt' }));

api.get('/random', async (req, res) => {

    if(req.user.displayName){

        res.send(Math.random());

    } else {

        res.sendStatus(401);

    }

})

/*api.get('/user/roles', (req, res) => {

    const currentUser = userRoles.find((user) => { return user.email == req.user.emails[0].value; });
    res.send(currentUser? currentUser.roles : []);

})

api.get('/user/request', (req, res) => {
    if (checkAdmin(req)) {

        const userRequest = userRoles.filter((user) => { return user.roles.length == 0 });
        let userIds = [];
        userRequest.forEach((user) => { userIds.push(user.email) });
        res.send(userIds);

    } else {

        res.sendStatus(403);

    }
})

api.get('/users', (req, res) => {
    if (checkAdmin(req)) {

    res.send(userRoles);

    } else {

        res.sendStatus(403);

    }
})

api.post('/user/request', bodyParser.text(), (req, res) => {
    const userExists = userRoles.find((user) => {return user.email == req.user.emails[0].value})
if(!userExists) {

    userRoles.push({"email": req.user.emails[0].value, "roles": []})
    res.sendStatus(202);

    } else {

        res.sendStatus(403);

    }
})

api.post('/user/approve', bodyParser.text(), (req, res) => {
    if (checkAdmin(req)) {

    let userToUpdate = userRoles.find((user) => {return user.email == req.body});
    userToUpdate.roles = ['user'];
    res.send(userToUpdate);

    } else {

        res.sendStatus(403);

    }
})

api.delete('/user/:id', (req, res) => {
    if (checkAdmin(req)) {
    userRoles = userRoles.filter((user) => { return user.email !== req.params.id; });
    res.sendStatus(204);
} else {
    res.sendStatus(403);
}
})

function checkUser(req) {
    const currentUser = userRoles.find((user) => { return user.email == req.user.emails[0].value; });
    if (currentUser !== undefined && (currentUser.roles.includes('user') || currentUser.roles.includes('admin'))) {
        return true;
    } else {
        return false;
    }
}

function checkAdmin(req) {
    const currentUser = userRoles.find((user) => { return user.email == req.user.emails[0].value; });
    if (currentUser !== undefined && currentUser.roles.includes('admin')) {
        return true;
    } else {
        return false;
    }
}*/

module.exports = api;