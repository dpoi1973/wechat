/**
 * /weixin/userController
 *
 * @description :: Server-side logic for managing /weixin/users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');
var WechatAPI = require('wechat-api');
var api = new WechatAPI(weixinCommonServices.appid, weixinCommonServices.appsecret);

module.exports = {
    reflashUsers: function (req, res) {
        api.getFollowers(function(err, result){
            if(err){
                res.serverError(err);
            }else{
                while(result){
                    api.getFollowers(nextOpenid, callback); 
                }
            }
            
        });
        
    }
};

