/**
 * Created by zp on 2015/7/27.
 */
var models              = require("../models")
var uuid                = require("node-uuid")
var WechatRes           = models.WechatRes
//保存 微信 发送 过来的数据
exports.SaveWechatRes = function(weixinobj,callback){
    var wechatRes  = new WechatRes()
    //wechatRes.msgId = weixinobj["MsgId"]
    wechatRes.wechatid = weixinobj["FromUserName"]
    wechatRes.timestamp = weixinobj["CreateTime"]
    wechatRes.type = "wechat";
    wechatRes.save(callback)
}
//防止post 多次提交
exports.SaveWebRes =function(){
    return function(req,res,next){
        var uniquekey =  req.body["uniquekey"]
        if(req.method=="POST"&&uniquekey){
            var wechatRes  = new WechatRes()
            wechatRes.wechatid = req.session["username"]
            wechatRes.timestamp = uniquekey
            wechatRes.type = "web"
            wechatRes.save(function(err,result){
                 if(err!=null){
                     next(new Error("请返回重试!"))
                 }else{
                     next()
                 }
            })
        }else{
            next()
        }
    }
}
//读取 微信 发送过来的数据
exports.CountWechatRes = function(weixinobj,callback){
    WechatRes.count({wechatid:weixinobj["FromUserName"],timestamp:weixinobj["CreateTime"]},callback)
}
