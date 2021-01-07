const Koa = require('koa');
const app = new Koa();

const port = 3400;
app.listen(port, () => console.log(`Server is listening to port ${port}`));
