/*
 * app.js
 */

var config = require('./config')

// 用于生产环境
if (!config.debug) {

}

require('colors');
var path                = require("path");
var Loader              = require("loader");
var express             = require("express");
var errorhandler        = require('errorhandler');
var session             = require('express-session');
var passport            = require("passport");
// require('./middlewares/mongoose_log'); // 打印 mongodb 查询日志
require('./models');
var router              = require("./router")
var auth                     = require('./middlewares/auth');
var errorPageMiddleware = require("./middlewares/error_page");
// var proxyMiddleware          = require('./middlewares/proxy');
var RedisStore          = require('connect-redis')(session);
var _                   = require('lodash');
var csurf               = require('csurf');
var compress            = require('compression');
var bodyParser          = require('body-parser');
var requestLog          = require('./middlewares/request_log');
var errorhandler        = require('errorhandler');
var renderMiddleware    = require('./middlewares/render');
var logger              = require("./common/logger");
var busboy              = require('connect-busboy');
// 静态文件目录
var staticDir = path.join(__dirname, 'public');
var exphbs  = require('express-handlebars');

// assets
var assets    = {};


if (config.mini_assets) {
    try {
        assets = require('./assets.json');
    } catch (e) {
        console.log('You must execute `make build` before start app when mini_assets is true.');
        throw e;
    }
}

var urlinfo     = require('url').parse(config.host);
config.hostname = urlinfo.hostname || config.host;

var app = express();

// configuration in all env
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.enable('trust proxy');

// Request logger 请求时间
app.use(requestLog);

if (config.debug) {
  // 渲染时间
  app.use(renderMiddleware.render);
}

// 静态资源
app.use(Loader.less(__dirname));
app.use('/public', express.static(staticDir));

// 每日访问限制

app.use(require('response-time')());
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(require('method-override')());
var cookieParser = require('cookie-parser')(config.session_secret);
app.use(cookieParser);
app.use(compress());
var session = session({
    secret: config.session_secret,
    store: new RedisStore({
        port: config.redis_port,
        host: config.redis_host,
    }),
    resave: true,
    saveUninitialized: true,
})
app.use(session);

app.use(passport.initialize());

// custom middleware
app.use(auth.authUser);
// app.use(auth.blockUser());

if (!config.debug) {
  app.use(function (req, res, next) {
    if (req.path.indexOf('/api') === -1) {
      csurf()(req, res, next);
      return;
    }
    next();
  });
  app.set('view cache', true);
}

// set static, dynamic helpers
_.extend(app.locals, {
    config: config,
    Loader: Loader,
    assets: assets
});

app.use(errorPageMiddleware.errorPage);
// _.extend(app.locals, require('./common/render_helper'));
app.use(function (req, res, next) {
    res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
    next();
});

app.use(busboy({
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
}));

app.use('/', router);

// error handler
if (config.debug) {
    app.use(errorhandler());
} else {
    app.use(function (err, req, res, next) {
        console.error('server 500 error:', err);
        return res.status(500).send('500 status');
    });
}

// 配置socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(config.port, function () {
    logger.log("NodeClub listening on port %d", config.port);
    logger.log("God bless love....");
    logger.log("You can debug your app with http://" + config.host + ':' + config.port);
    logger.log("");
});

io.use(function(socket, next) {
    session(socket.handshake, {}, next);
});

io.on('connection', function (socket) {
    socket.on('connection name',function(user){
        io.sockets.emit('new user', user.name + " has joined.");
    })
});

module.exports = app;
