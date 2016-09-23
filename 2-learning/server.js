var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var COMMENTS_FILE = path.join(__dirname, 'data/weather.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		// 响应头，设置不缓存Cache，实时刷新
		res.setHeader('Cache-Control', 'no-cache');
		next();
});

app.get('/data/weather', function(req, res) {
	fs.readFile(COMMENTS_FILE, function(err, data) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		res.json(JSON.parse(data));
	});
});

app.post('/data/weather', function(req, res) {
	fs.readFile(COMMENTS_FILE, function(err, data) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		var weather = [];
		if(req.body.list){
			 weather = req.body.list;
		}
		else{
			weather = JSON.parse(data);
			var newWeather = {
				id: Date.now(),
				place: req.body.place,
				weather: req.body.weather,
			};
			weather.push(newWeather);
		}
		fs.writeFile(COMMENTS_FILE, JSON.stringify(weather, null, 4), function(err) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			res.json(weather);
		});
	});
});


app.listen(app.get('port'), function() {
	console.log('Server started: http://localhost:' + app.get('port') + '/');
});
