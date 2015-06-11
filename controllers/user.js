// 引入所需模块
var eventproxy     = require('eventproxy');
var User = require('../proxy').User;
var Topic = require('../proxy').Topic;
var crypto = require('crypto');
var validator = require('validator');

/*
 * 显示用户的基本信息
 * - 用户的基本信息
 * - 用户最近推送的话题
 */
exports.index = function(req, res, next) {
    var ep = new eventproxy();
    ep.fail(next);

    var loginname = req.params.name;
    User.getUserByLoginName(loginname, function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render404('该用户不存在');
        }
        var query = {'author_id': user._id};
        var opt = {limit: 5, sort: '-create_at'};
        Topic.getTopicsByQuery(query, opt, function(err, topicList) {
            if (err) {
                return next(err);
            }
            if (!topicList) {
                topicList = [];
            }

            res.render('user/index', {
                user: user,
                topicList: topicList
            })
        })
    })  
};

exports.showSetting = function(req, res, next) {
	res.render('index');
};

exports.setting = function(req, res, next) {
	var ep = new eventproxy();
    ep.fail(next);

    var male = validator.trim(req.body.male);
    male = validator.escape(male);
    var wechat = validator.trim(req.body.wechat);
    wechat = validator.escape(wechat);
    var qq = validator.trim(req.body.qq);
    qq = validator.escape(qq);
    var location = validator.trim(req.body.location);
    location = validator.trim(location)
    var avatar = validator.trim(req.body.avatar);
    avatar = validator.escape(avatar);
    var name = validator.trim(req.body.name);
    name = validator.escape(name);
    var signature = validator.trim(req.body.signature);
    signature = validator.escape(signature);
    User.getUserById(req.session.user._id, ep.done(function(user) {
        if (!user) {
            return next();
        }
    	user.male = male;
    	user.wechat = wechat;
    	user.qq = qq;
    	user.location = location;
    	user.avatar = avatar;
    	user.name = name;
    	user.signature = signature;
    	user.save(function(err) {
    		if (err) {
    			next(err);
    		} else {
    			req.session.user = user.toObject({virtual: true});
    			res.status(200);
    			data = {
    				errCode: 200,
    				message: '设置成功'
    			}
    			res.json(data);
    		}
    	})
    }));
};

exports.changePassword = function(req, res, next) {
	var oldPassword = req.body.oldPassword;
	var newPassword = req.body.newPassword;
	var reNewPassword = req.body.reNewPassword;

	var ep = new eventproxy();
	ep.fail(next);

	ep.on('chang_err', function(errMessage) {
		res.status(422);
		data = {
			errCode: 422,
			message: errMessage
		}
		res.json(data);
	});

	if ([oldPassword, newPassword, reNewPassword].some(function(item) {return item === ''})) {
		return ep.emit('chang_err', "信息填写不完整");
	}

	if (newPassword.length < 6) {
		return ep.emit('chang_err', '新密码长度不得小于六位');
	}

	if (newPassword != reNewPassword) {
		return ep.emit('chang_err', "两个新密码不一致");
	}

	User.getUserById(req.session.user._id, ep.done(function(user) {
		var md5 = crypto.createHash('md5');
        var passHash = md5.update(oldPassword).digest('base64');
        var newPasswordHash = md5.update(oldPassword).digest('base64');

        if (user.password !== passHash) {
        	res.status(403);
        	data = {
        		errCode: 403,
        		message: '旧密码错误'
        	}
        	res.json(data);
        }

        user.password = newPasswordHash;
        user.save(function(err) {
        	if (err) {
        		next(err);
        	}
        	res.status(200);
        	data = {
        		errCode: 200,
        		message: '更改密码成功'
        	}
        	res.json(data);
        })
	}))
}

exports.listCollectedTopics = function(req, res, next) {

};

exports.listTopics = function(req, res, next) {

}

exports.listComments = function(req, res, next) {

}
