//setup Dependencies
var connect = require('connect');
var express = require('express');
var session = require('express-session');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');

//Setup Express
var app = express();

app.set('port', process.env.PORT || 8081);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view options', { layout: false });
app.use(favicon(__dirname + '/static/images/favicon.ico'));
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'static')));

var server = app.listen(app.get('port'), function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Listening at http://%s:%s', host, port)
});

///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

/////// ADD ALL YOUR ROUTES HERE  /////////

app.get('/', function(req,res){
  res.render('index.jade', {
    locals : { 
              title : 'Your Page Title'
             ,description: 'Your Page Description'
             ,author: 'Your Name'
             ,analyticssiteid: 'XXXXXXX' 
            }
  });
});

//A Route for Creating a 500 Error (Useful to keep around)
app.get('/500', function(req, res){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404.jade', { url: req.url });
    return;
  }
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404.jade', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');

  //throw new NotFound;
});

function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}