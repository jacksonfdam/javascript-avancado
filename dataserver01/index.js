var express   =     require("express");
var bodyParser  =    require("body-parser");
var app       =     express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/produtos',function(req,res){
  res.sendFile(__dirname + '/produtos.json');
});

app.post('/',function(req,res){
  var user_name=req.body.user;
  var password=req.body.password;
  console.log("From Client pOST request: User name = " + user_name + " and password is " + password);
  res.end("yes");
});

app.listen(3000,function(){
  console.log("Started on PORT 3000");
})