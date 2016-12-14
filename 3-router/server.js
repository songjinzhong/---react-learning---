var express = require('express')
var path =require('path')
var compression = require('compression')

var app = express();

app.use(compression())

app.use(express.static(path.join(__dirname, 'public')))

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

var Port = process.env.PORT || 8080;

app.listen(Port, function(){
  console.log('server has start at ' + Port)
})