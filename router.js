/*!
 * route.js
 * Copyright(c) 2015 yuanzm <sysu.yuanzm@gmail.com>
 * MIT Licensed
 */

var express = require("express");
var site = require("./controllers/site");
var sign = require("./controllers/sign");
var router           = express.Router();

// home page
router.get('/', site.index);

router.get('/signup', sign.showSignUp);
router.post('/signup', sign.signUp);
router.get('/login', sign.showLogin);
router.post('/login', sign.login);

module.exports = router;
