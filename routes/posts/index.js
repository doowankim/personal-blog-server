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

// post 데이터 통째로 수정
// PUT localhost:3400/posts/:id
router.put('/:id', postCtrl.replace);

// post 원하는 필드만 수정
// PATCH localhost:3400/posts/:id
router.patch('/:id', postCtrl.update);

// post 삭제
// DELETE localhost:3400/posts/:id
router.delete('/:id', postCtrl.delete);

module.exports = router;
