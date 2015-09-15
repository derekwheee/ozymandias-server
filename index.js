var express = require('express');
var app = express();
var http = require('http').Server(app);
var dispatch = require('./lib/dispatch')(http);
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var hbs = exphbs.create({
    defaultLayout: '_layout',
    layoutsDir: 'dist/views/shared/',
    partialsDir: 'dist/views/shared/partials/',
    extname: '.hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
    res.render(__dirname + '/views/home', {title: 'HOME', data : {}});
});

http.listen(app.get('port'), function(){
  console.log('listening on port',app.get('port'));
});
