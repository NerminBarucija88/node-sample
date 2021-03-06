var express = require('express'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    errorHandler = require('express-error-handler'),
    app = express();

 
var dbOperations = require("./dbOperations.js");
var logFmt = require("logfmt");

app.set('views', __dirname + '/views') ;

app.get('/' , function(req,res) {
    res.sendfile('views/index.html');
} );

app.get('/signed' , function(req,res) {
    res.sendfile('views/data.html');
} );

app.get('/health' , function(req,res) {
    res.json({ health: "ok" });
} );

app.get('/db/readRecords', function(req,res){
    dbOperations.getRecords(req,res);
});

app.get('/db/addRecord', function(req,res){
    dbOperations.addRecord(req,res);
});

app.get('/db/delRecord', function(req,res){
    dbOperations.delRecord(req,res);
}); 

app.set('port', process.env.PORT || 3000);
app.use(function(error, req, res, next) {
    // Any request to this server will get here, and will send an HTTP
    // response with the error message 'woops'
    res.json({ message: error.message });
  });
app.use(express.static(__dirname + '/client')); 
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
