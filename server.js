var express = require('express');
var app = express();

app.use(express.static(__dirname + '/exercicios'));

app.listen(8000);
