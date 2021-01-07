const Post = require('../../model/posts');
const Joi = require('joi');
const {
	Types: { ObjectId },
} = require('mongoose');

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
exports.replace = async ctx => {
	const { id } = ctx.params;

	if (!ObjectId.isValid(id)) {
		ctx.status = 400; // Bad Request
		return;
	}

	// 검증할 스키마
	const schema = Joi.object().keys({
		title: Joi.string().required(),
		author: Joi.string().required(),
		body: Joi.string().required(),
		tags: Joi.array().items(
			Joi.object().keys({
				skill: Joi.string().required(),
			}),
		),
		attachedFile: Joi.string().required(),
	});

	// validate를 통하여 검증
	const validation = schema.validate(ctx.request.body);

	// 스키마가 잘못됐을 경우
	if (validation.error) {
		ctx.status = 400; // Bad Request
		ctx.body = validation.error;
		return;
	}

	let post;

	try {
		post = await Post.findByIdAndUpdate(id, ctx.request.body, {
			upsert: true, // 데이터가 존재하지 않으면 새로 만들어준다.
			new: true, // 반환하는 값이 업데이트된 데이터
			// new: true가 없으면 ctx.body = post 했을 때 업데이트 전의 데이터를 보여줌
		});
	} catch (e) {
		return ctx.throw(500, e);
	}

	ctx.body = post;
};

// Post 부분 수정 API
exports.update = async ctx => {
	const { id } = ctx.params;

	if (!ObjectId.isValid(id)) {
		ctx.status = 400; // Bad Request
		return;
	}

	let post;

	try {
		post = await Post.findByIdAndUpdate(id, ctx.request.body, {
			// upsert 의 기본 값은 false
			new: true, // true로 바꿔주면 반환되는 값이 업데이트된 데이터. true가 아니라면 ctx.body = post 했을 때 업데이트 전의 데이터를 보여줌.
		});
	} catch (e) {
		return ctx.throw(500, e);
	}

	ctx.body = post;
};

// Post 삭제 API
exports.delete = async ctx => {
	const { id } = ctx.params;

	try {
		await Post.findByIdAndRemove(id).exec();
	} catch (e) {
		if (e.name === 'CastError') {
			ctx.status = 400;
			return;
		}
	}

	ctx.status = 204; // No Content
};
