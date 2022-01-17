const express = require('express');
const { sequelize, User, Instrument } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);


route.get('/users', (req, res) => {
    User.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/instruments', (req, res) => {
    console.log("poruke");
    Instrument.findAll({ include: ['user'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/instruments', (req, res) => {
    console.log("post: routeInstrument " + req.body.name);
    User.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            Instrument.create({ name: req.body.name, price: req.body.price,
                type: req.body.type, userId: req.user.userId })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            
            /* else {
                res.status(403).json({ msg: "Invalid credentials"});
            } */
        })
        .catch( err => res.status(500).json(err) );
        
});

module.exports = route;