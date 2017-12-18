/**
 * Created by zp on 2015/7/29.
 */
var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var WechatRes = new Schema({
    wechatid:{type:String},
    //微信服务端发送过来的是timestamp web访问的值是uuid
    timestamp:{type:String},
    //msgId:{type:String},
    date:{type:Date,default:Date.now},
    type:{type:String},
})
//WechatRes.index({msgId:1},{unique: true})
// WechatRes.index({wechatid:1,timestamp:1},{unique: true})
mongoose.model("WechatRes",WechatRes)