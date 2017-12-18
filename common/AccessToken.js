/**
 * Created by zp on 2015/7/1.
 */
var models          = require("../models")
var config          =  require("../config")
var AccessToken     = models.AccessToken
var os              = require('os')
var hostName        = os.hostname()
exports.DBGetToken=function(callback){
    console.log("获得access_Token开始")
    console.log(hostName)
    AccessToken.findOne({computername:hostName},function(err,obj){
        console.log("获得access_token结束")
        if(obj!=null){
            var sumTime = (obj["createdate"].getTime()+7150*1000)
            var nowTime = new Date().getTime()
            if(sumTime<nowTime){
                callback(null,null)
            }else{
                callback(null,{
                    accessToken:obj["access_token"],
                    expireTime:obj["expires_in"]
                })
            }

        }else{
            callback(null,null)
        }
    })
}
exports.DBSaveToken=function(token,callback){
    console.log("保存access_Token开始")
    AccessToken.remove({computername:hostName},function(){
        token.expireTime=  token.expireTime||7200
        var accessToken =  new AccessToken()

        accessToken.access_token =  token.accessToken;
        accessToken.expires_in = token.expireTime
        accessToken.endDate =  new Date(new Date().getTime()+( token.expireTime*1000))
        accessToken.computername = hostName
        accessToken.save(function(){
            console.log("保存access_Token结束")
            callback()
        })
    })
}