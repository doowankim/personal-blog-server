const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const postRoute = require('./routes/posts');

router.use('/posts', postRoute.routes());

app.use(router.routes()).use(router.allowedMethods());

const port = 3400;
app.listen(port, () => console.log(`Server is listening to port ${port}`));
