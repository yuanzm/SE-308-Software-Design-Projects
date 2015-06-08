var config = require('../config');

function gen_session(user, res) {
    var auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
    var opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true
    };
    res.cookie(config.auth_cookie_name, auth_token, opts); //cookie 有效期30天
    return res;
}

exports.userRequired = function(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(403).send('forbidden!');
    }
};

exports.gen_session = gen_session;
