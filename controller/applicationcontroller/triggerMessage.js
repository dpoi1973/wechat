var wechatservice = require('../../services/wechatService');
var sendmessage = require('./sendMessage');
exports.findDZ = function(username) {
    console.log(username);
    wechatservice.selectPerson(username,function(result){
        console.log(result.wechatid);
        sendmessage.sendMessages(result.wechatid,'这是一条测试消息');
    })
}

exports.sendpaln = function(username,begintime,endtime,message,creatername,description) {
    wechatservice.selectPerson(username,function(result){
        console.log(result.wechatid);
        sendmessage.sendMessages(result.wechatid,'日程提醒:\n'+'\t今天\t'+begintime+'--  '+endtime+'\n\t内容:\t'+message+'\n\t备注:\t'+description+'\n\t\t\t\t创建人:'+creatername);
    })
}