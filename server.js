// call packages
var express = require('express');
var app = express();
var userRoute = require('./app/routes/user');
var teamRoute = require('./app/routes/team');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/mydb", function(err, db){
	if (!err) {
		console.log("We are connected");
	}
});

//conf app to use body-parser
app.use(bodyParser());

var port = process.env.port || 8080

// routes for api
var router = express.Router();

// middleware to use for all requests
router.use(function(request, response, next){
	console.log("Something is happening");
	next();
});

// home page route
router.get('/', function(req, res){
	res.json({message: 'We in home page'});
});

app.use('/api', router);
app.use('/api', userRoute);
app.use('/api', teamRoute);
app.listen(port);
console.log("Magic on port" + port);