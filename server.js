require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const postRoute = require('./routes/posts');

const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB Connected...'))
	.catch(e => console.errer(e));

app.use(bodyParser());

router.use('/posts', postRoute.routes());

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is listening to port ${port}`));
