var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	lastname: String,
	team: {
		type: Schema.ObjectId, 
		ref: 'Team'
	}
});

module.exports = mongoose.model('User', UserSchema);