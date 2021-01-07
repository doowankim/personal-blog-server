const Post = require('../../model/posts');

exports.list = ctx => {
	ctx.body = 'get list';
};

exports.get = ctx => {
	ctx.body = 'get one item';
};

exports.create = async ctx => {
	const { title, author, body, tags, attachedFile } = ctx.request.body;

	const post = new Post({
		title,
		author,
		body,
		tags,
		attachedFile,
	});

	try {
		await post.save();
	} catch (e) {
		return ctx.throw(500, e);
	}

	ctx.body = post;
};

exports.replace = ctx => {
	ctx.body = 'replaced post';
};

exports.delete = ctx => {
	ctx.body = 'deleted post';
};
