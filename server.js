var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());

var compiler = require('compilex');
var option = {stats : true};
compiler.init(option);

app.get('/' , function (req , res ) 
{
res.sendfile( __dirname + "/index.html");
});

app.post('/compilecode' , function (req , res ) 
{
	var c = req.body.code;	
	var i = req.body.input;
  var Radio = req.body.inputRadio;
  var lang = req.body.lang;
    
    if(lang === "Java")
    {
        if(Radio === "true")
        {
            var envData = { OS :"linux" };     
            console.log(c);
            
compiler.compileJavaWithInput( envData , c , i ,  function(data){
                res.send(data);
            });
        }
        else
        {
            var envData = { OS : "linux" };     
            console.log(c);
            compiler.compileJava( envData , c, function(data){
                res.send(data);
            });

        }

    }
    if( lang === "Python")
    {
        if(Radio === "true")
        {
            var envData = { OS : "linux"};
            compiler.compilePythonWithInput(envData , c , i , function(data){
                res.send(data);
            });            
        }
        else
        {
            var envData = { OS : "linux"};
            compiler.compilePython(envData , c , function(data){
                res.send(data);
            });
        }
    }
    
    
});

app.get('/fullStat' , function(req , res ){
    compiler.fullStat(function(data){
        res.send(data);
    });
});

app.listen(5000);
