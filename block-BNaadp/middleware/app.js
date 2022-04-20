var cookieParser = require('cookie-parser');
app.use(cookieParser());

var express = require('express');

// application init
var app = express();

app.get('/', function (req, res) {
  res.cookie('name', 'express').send('cookie set'); //Sets name = express
});

app.listen(3000);
