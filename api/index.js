var express = require('express');
var GoogleAuth = require('simple-google-openid');
var bodyParser = require('body-parser');
var api = express.Router();

api.use(GoogleAuth("511406985315-3rk44gqt9ri26bkkchmi1um20ielribc.apps.googleusercontent.com"));

api.use('*', GoogleAuth.guardMiddleware({ realm: 'jwt' }));

api.get('/random', async (req, res) => {

    if(req.user.displayName){

        res.send(Math.random().toString());

    } else {

        res.sendStatus(401);

    }

})

module.exports = api;