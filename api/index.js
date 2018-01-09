'use strict';

const express = require('express');
const GoogleAuth = require('simple-google-openid');

const api = express.Router();

api.use(GoogleAuth("511406985315-3rk44gqt9ri26bkkchmi1um20ielribc.apps.googleusercontent.com"));

api.use('*', GoogleAuth.guardMiddleware({ realm: 'jwt' }));

api.get('/random', async (req, res) =>{

    if(req.user.displayName){

        res.send(Math.random());

    } else {

        res.sendStatus(401);

    }

})

module.exports = api;