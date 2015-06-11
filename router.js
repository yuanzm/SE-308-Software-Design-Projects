/*!
 * route.js
 * Copyright(c) 2015 yuanzm <sysu.yuanzm@gmail.com>
 * MIT Licensed
 */

var express 		 = require("express");
var auth 			 = require('./middlewares/auth');
var limit 			 = require('./middlewares/limit');
var site 			 = require("./controllers/site");
var sign 			 = require("./controllers/sign");
var user 			 = require("./controllers/user");
var message 		 = require('./controllers/message');
var topic 			 = require('./controllers/topic');
var comment 		 = require('./controllers/comment');
var search 			 = require('./controllers/search');
var topic_collect 	 = require('./controllers/topic_collect');
var staticController = require('./controllers/static');
var upload 			 = require('./controllers/upload');
var config 			 = require('./config');
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
router.post('/setting', auth.userRequired, user.setting);
router.get('/user/:name/collections', user.listCollectedTopics);
router.get('/user/:name/topics', user.listTopics);
router.get('/user/:name/comments', user.listComments);

// 消息
router.get('/my/messages', auth.userRequired, message.index);

// 话题
router.get('/topic/create', auth.userRequired, topic.showCreate);
router.post('/topic/create', auth.userRequired, topic.create);
router.get('/topic/:tid', topic.index);
router.get('/topic/:tid/edit', auth.userRequired, topic.showEdit);
router.post('/topic/:tid/update', auth.userRequired, topic.update);
router.post('/topic/:tid/delete', auth.userRequired, topic.deleteTopic);
router.post('/topic/:tid/up', auth.userRequired, topic.up); // 为评论点赞

// 收藏
router.post('/topic/:tid/collect', auth.userRequired, topic_collect.collect); // 收藏操作
router.post('/topic/:tid/de_collect', auth.userRequired, topic_collect.de_collect); // 收藏操作

// 评论
// limit.peruserperday('create_reply', config.create_reply_per_day)
router.post('/:tid/comment', auth.userRequired, comment.add);
router.post('/comment/:cid/update', auth.userRequired, comment.update); // 修改某评论
router.post('/comment/:cid/delete', auth.userRequired, comment.delete); // 删除某评论

// 搜索
router.get('/search', search.index);

// 静态页面
router.get('/about', staticController.about);

// 上传文件
router.post('/upload', auth.userRequired, upload.upload);

module.exports = router;
