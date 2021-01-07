const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: String,
	author: String,
	body: String,
	tags: [
		{
			skill: String,
		},
	],
	attachedFile: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Post', postSchema);
