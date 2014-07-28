var express = require('express');
var Team = require('../models/team');
var User = require('../models/user');
module.exports = (function(){
	var router = express.Router();

	router.route('/teams')
		.post(function(req, res){ 
			var team = new Team();
			team.name = req.body.name;

			User.findOne({name: req.body.username}, function(err, user) {
				team.owner = user
				team.save(function(err){
					if (err) {
						res.send(err);
					}
				});
			});
			res.json({message: "Team created"})
		})

		.get(function(req, res){
			Team.find(function(err, teams){
				if(err) {
					res.send(err)
				}
				res.json(teams)
			})
		})
	// single team route
	router.route('/teams/:team_id')
		.get(function(req, res){
			//get team and populate all associations in object
			Team.findById(req.params.team_id, function(err, teams){
				Team.populate(teams, {path: 'owner'}, function(err, teams) {
					Team.populate(teams, {path: 'users'}, function(err, teams) {
						res.send(teams);
					})			
				})
			})
		})

		.put(function(req, res){
			Team.findById(req.params.team_id, function(err, team){
				if(err) {
					res.send(err)
				}
				User.findOne({name: req.body.username}, function(err, user) {
					team.users.push(user); 
					team.save(function(err){
						if (err) {
							res.send(err);
						}
					});
				});
				res.json({message: "Team Updated"})
			})
		})

		.delete(function(req, res){
			Team.remove({
				_id: req.params.team_id
			}, function(err, team) {
				if(err) {
					res.send(err)
				}
				res.json({message: "Team removed"})
			});						
		})
	return router
})();