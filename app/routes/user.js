var express = require('express');
var User = require('../models/user');
var Team = require('../models/team');

module.exports = (function(){
	// routes for api
	var router = express.Router();

	// routes that end in /user
	router.route('/users')
		.post(function(req, res){
			var user = new User();
			user.name = req.body.name;
			user.lastname = req.body.lastname;
			// if team exist add to user object
			if (req.body.teamname) {
				Team.findOne({name: req.body.teamname}, function(err, team){
					user.team = team;
					user.save(function(err){
						if (err) {
							res.send(err);
						}
					})
				})
			}
			else {
				user.save(function(err){
					if (err) {
						res.send(err);
					}
				})
			}
			res.json({message: "User created"})
		})

		.get(function(req, res){
			User.find(function(err, users){
				if(err) {
					res.send(err)
				}
				res.json(users)
			})
		})

	// single user route
	router.route('/users/:user_id')
		.get(function(req, res){
			User.findById(req.params.user_id, function(err, user) {
				User.populate(user, {path: 'team'}, function(err, user) {
					res.json(user);
				})		
			});
		})
		// find user and update attributes
		.put(function(req, res){
			User.findById(req.params.user_id, function(err, user){
				if(err) {
					res.send(err)
				}
				user.name = req.body.name;

				if (req.body.teamname) {
					Team.findOne({name: req.body.teamname}, function(err, team) {
						user.team = team;
						user.save(function(err){
							if(err) {
								res.send(err)
							}
						})
					})
				}
				else {
					user.save(function(err){
						if(err) {
							res.send(err)
						}
					})
				}
				res.json({message: "User Updated"})
			})
		})

		.delete(function(req, res){
			User.remove({
				_id: req.params.user_id
			}, function(err, user) {
				if(err) {
					res.send(err)
				}
				res.json({message: "User removed"})
			});						
		})
	return router;
})();
