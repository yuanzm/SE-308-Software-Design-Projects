/*!
 * route.js
 * Copyright(c) 2015 yuanzm <sysu.yuanzm@gmail.com>
 * MIT Licensed
 */

var express = require("express");
var auth = require('./middlewares/auth');
var limit = require('./middlewares/limit');
var site = require("./controllers/site");
var sign = require("./controllers/sign");
var user = require("./controllers/user");
var message = require('./controllers/message');
var topic = require('./controllers/topic');
var comment = require('./controllers/comment');
var search = require('./controllers/search');
var staticController = require('./controllers/static');
var config = require('./config');

var router           = express.Router();

// home page
router.get('/', site.index);

// 注册登录登出
router.get('/signup', sign.showSignUp);
router.post('/signup', sign.signUp);
router.get('/login', sign.showLogin);
router.post('/login', sign.login);
router.post('/signout', sign.signOut)

// 用户
router.get('/user/:name', user.index);
router.get('/setting', user.showSetting);
router.post('/setting', user.setting);
router.get('/user/:name/collections', user.listCollectedTopics);
router.get('/user/:name/topics', user.listTopics);
router.get('/user/:name/comments', user.listComments);

// 消息
router.get('/my/messages', auth.userRequired, message.index);

// 话题
router.get('/topic/create', auth.userRequired, topic.create)
router.get('/topic/:tid', topic.index);
router.get('/topic/:tid/edit', auth.userRequired, topic.showEdit);
router.post('/topic/:tid/delete', auth.userRequired, topic.delete)

// 评论
router.post('/:tid/comment', auth.userRequired, limit.peruserperday('create_reply', config.create_reply_per_day), comment.add);
router.post('/comment/:cid/edit', auth.userRequired, comment.update); // 修改某评论
router.post('/comment/:cid/delete', auth.userRequired, comment.delete); // 删除某评论
router.post('/comment/:cid/up', auth.userRequired, comment.up); // 为评论点赞

// 搜索
router.get('/search', search.index);

// 静态页面
router.get('/about', staticController.about);

module.exports = router;
