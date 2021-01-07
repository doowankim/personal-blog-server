const Post = require('../../model/posts');

exports.list = ctx => {
	ctx.body = 'get list';
};

exports.get = ctx => {
	ctx.body = 'get one item';
};

exports.create = ctx => {
	ctx.body = 'create post';
};

exports.replace = ctx => {
	ctx.body = 'replaced post';
};

exports.delete = ctx => {
	ctx.body = 'deleted post';
};
