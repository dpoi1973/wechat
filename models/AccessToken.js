/**
 * Created by zp on 2015/7/1.
 */
var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var AccessTokenSchema = new Schema({
    "access_token":{type:String},
    "expires_in":{type:Number},
    //创建日期
    createdate:{type:Date,default:Date.now},
    //结束日期
    endDate:{type:Date},
    //机器名 区分测试机器和生产机器
    computername:{type:String}
})

mongoose.model("AccessToken",AccessTokenSchema)