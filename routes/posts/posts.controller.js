const Post = require('../../model/posts');

// 전체 Post List 가져오는 API
exports.list = async ctx => {
	let lists;

	try {
		lists = await Post.find().exec();
	} catch (e) {
		return ctx.throw(500, e);
	}

	ctx.body = lists;
};

// Post Id 1개만 가져오는 API
exports.get = async ctx => {
	const { id } = ctx.params;

	let list;

	try {
		list = await Post.findById(id).exec();
	} catch (e) {
		return ctx.throw(500, e);
	}

	if (!list) {
		ctx.status = 404;
		ctx.body = {
			message: 'Post not found',
		};
	}

	ctx.body = list;
};

// Post 등록 API
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

// Post 수정 API
exports.replace = ctx => {
	ctx.body = 'replaced post';
};

// Post 삭제 API
exports.delete = ctx => {
	ctx.body = 'deleted post';
};
