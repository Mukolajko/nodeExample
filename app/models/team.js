var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
	name: String,
	owner: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	users: [{
		type: Schema.ObjectId,
		ref: 'User'
	}]
});

module.exports = mongoose.model('Team', TeamSchema);