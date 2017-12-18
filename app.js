var wechat                          = require('wechat-enterprise');
var express                         = require('express');
var bodyParser                      = require('body-parser')
var methodOverride                  = require('method-override');
var _                               = require("lodash")
var config                          = require("./config")
var path                            = require('path');
var session                         = require('express-session');
var AccessToken                    =require('./common/AccessToken')
var MongoStore                      = require('connect-mongo')(session);
var app                             = express();
var responsemessage  = require('./controller/applicationcontroller/responceMessage');
var socketUtils = require('./controller/applicationcontroller/socketUtilsController');
var API = wechat.API;
var api = new API(config.corpId,config.corpSecret,config.Application.agentid,AccessToken.DBGetToken,AccessToken.DBSaveToken);
//全局变量 jade
_.extend(app.locals,{
    config:config,
    _:_
})

app.use(express.query());
app.use(express.static("public"));
app.use(function(req,res,next){
    req.api =  api;
    // if(config.urlport&&req.headers.host.indexOf(':')==-1){
    //     req.headers.host = req.headers.host+":" + config.urlport
    // }
    next()
})
app.use(bodyParser.json());

// app.use(bodyParser.urlencoded());

app.use(methodOverride());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(session({
//     secret:config.SessionSecret,
//     store: new MongoStore(config.SessionConfig),
//     cookie: { path: '/' },
//     rolling:true //每次都刷新所有cookie
// }));

app.use("/pmweixin",responsemessage.responseMessage)
app.use("/qr",socketUtils.qr)
app.use("/login",socketUtils.login)
app.all('/loginHandle', socketUtils.loginHandle);      //登录处理
app.all('/baidu', socketUtils.baidu); 

var server = app.listen(1337, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://192.168.0.55:1337', host, port);
});

var io = require('socket.io')(server);

socketUtils.socket(io);
io.on('connection', (socket) => {
    console.log(socket,'in');
})


module.exports = app;

// var fs = require('fs');

// var api = new API('wxc235846a7eeb4780', 'ffcad59e9f4ba4abfcf34c00fba665d4', '9', function (callback) {
//   // 传入一个获取全局token的方法
//   fs.readFile('access_token.txt', 'utf8', function (err, txt) {
//     if (err) {return callback(err);}
//     callback(null, JSON.parse(txt));
//   });
// }, function (token, callback) {
//   // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
//   // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
//   fs.writeFile('access_token.txt', JSON.stringify(token), callback);
// });
