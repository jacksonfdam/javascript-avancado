var express = require('express');
var app = express();

app.use(express.static(__dirname + '/Exercicios'));

app.listen(8000);