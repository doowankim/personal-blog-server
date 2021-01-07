const Router = require('koa-router');
const router = new Router();

const postCtrl = require('./posts.controller');

// 특정 id의 post만 가져오기
// GET localhost:3400/posts/:id
router.get('/:id', postCtrl.get);

// 전체 post 리스트 가져오기
// GET localhost:3400/posts
router.get('/', postCtrl.list);

// post 만들기
// POST localhost:3400/posts
router.post('/', postCtrl.create);

// post 수정
// PATCH localhost:3400/posts
router.patch('/:id', postCtrl.replace);

// post 삭제
// DELETE localhost:3400/posts
router.delete('/:id', postCtrl.delete);

module.exports = router;
