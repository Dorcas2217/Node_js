var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var pizzaRouter = require('./routes/pizzas');
var usersRouter = require('./routes/users');


var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var counter = 0
app.use((req,res,next) => {
    counter += 1
    if(req.url == 'GET'){
        console.log("GET Counter : ", counter);
    }
    else if(req.url == '/pizzas'){
        console.log("GET Counter : ", counter);
    }
    next();
})
app.use('/pizzas', pizzaRouter);
app.use('/users', usersRouter);

module.exports = app;
