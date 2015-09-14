var path = require('path');
var http = require('http');
var express = require('express');
var io = require('socket.io')(http);
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();
var server = http.Server(app);
var dir = __dirname.split(path.sep);
var hbs = exphbs.create({
    defaultLayout: '_layout',
    layoutsDir: 'dashboard/dist/views/shared/',
    partialsDir: 'dashboard/dist/views/shared/partials/',
    extname: '.hbs'
});
var __dashboard;

dir.pop();
__dashboard = dir.join(path.sep) + '/dashboard';

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dashboard + '/static'));

app.get('/', function (req, res) {
    res.render(__dashboard + '/views/home', {title: 'HOME', data : {}});
});

io.on('connection', function(socket){
  console.log('a user connected');
});

server.listen(app.get('port'), function(){});
