var express     =   require("express");
var bodyParser  =   require("body-parser");
var app         =   express();
var sqlite3     =   require('sqlite3').verbose();
var db          =   new sqlite3.Database(':memory:');
var exists      =   false;
/*
Para trabalhar com Arquivos Fisicos
var fs = require("fs");
var file = "mensagens.db";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

if(!exists) {
console.log("Creating DB file.");
fs.openSync(file, "w");
}

*/

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

db.serialize(function() {
    if(!exists) {
        db.run("CREATE TABLE IF NOT EXISTS posts" 
            + "(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"
            + "body TEXT,"
            + "create_time INTEGER"
            + ")"
            );
    }  
});

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/messages',function(req,res){
    var limit = req.query.limit !== 0 ? req.query.limit : 20;
    db.all('SELECT * FROM posts ORDER BY id ASC', [], function (err, rows){
        if (err){
            console.err(err);
            res.status(500);
        }else {
            res.json({ "data" : rows});
        }
    });
});

app.post('/',function(req,res){
    /* var text = req.query.text; */
    var text = req.body.message;
    var now = new Date().getTime();
    db.run("INSERT INTO posts(body, create_time) values(?, ?)", [text, now]);
    res.json({ "status" : "ok"});
});

//db.close();

app.listen(3000,function(){
    console.log("Started on PORT 3000");
})