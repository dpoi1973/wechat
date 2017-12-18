var wechat                          = require('wechat-enterprise');
var config                          = require("../../config")
var API = wechat.API;


exports.sendMessages = function (wechatid,content) {
    var api = new API(config.corpId,config.corpSecret,config.Application.agentid);
    api.send(
        {
            "touser": wechatid,
        },
        {
            "msgtype": "text",
            "text": {
            "content": content
        },
            "safe":"0"
        }, 
        function(err, result) { 
            console.log("xiaoxi"+result);
        });

}

