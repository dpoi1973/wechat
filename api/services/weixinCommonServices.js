'use strict';

var xml2js = require('xml2js');
//var request = require('request');
//var WechatAPI = require('wechat-api');
//var api = new WechatAPI(weixinCommonServices.appid, weixinCommonServices.appsecret);

module.exports = {
  /**
   * 全局变量声明
   */
  appid: 'wx14837c48d963e578',
  appsecret: 'ffcad59e9f4ba4abfcf34c00fba665d4',

  /**
   * 
   */
  verifyEchostr: function (signature, timestamp, nonce) {
    var tokenstr = 'klfd432lksa432jfkl343920fkdlsa';
    var crypto = require('crypto'),
      shasum = crypto.createHash('sha1');

    var tarray = new Array(tokenstr, timestamp, nonce);
    var tmpstr = tarray.sort().join('');
    shasum.update(tmpstr);
    var sha1str = shasum.digest('hex');
    return (sha1str == signature);
  },
  /**
   * 事件处理及返回事件
   * 
   * 
   */
  responseEvent: function (data, callback) {
    var opts = {
      headless: true,
      cdata: true
    };
    var builder = new xml2js.Builder(opts);
    var time = Date.now();

    if (data.event == "subscribe") {

    } else

    if (data.event == "TEST") {
      var MongoClient = require('mongodb').MongoClient;
      var url = 'mongodb://192.168.0.14:27017/WechatDB_qy';
      var id = data.fromusername;
      MongoClient.connect(url, function(err, db) {
          var col = db.collection('oausers');
          col.find({'wechatid':`${id}`}).toArray(function(err, result) {
          db.close();
      var resultxml = {
        "xml":{
          "ToUserName": data.fromusername,
          "FromUserName": data.tousername,
          "CreateTime": time,
          "MsgType": "text",
          "Content": "result"
        }
      };
          return callback(builder.buildObject(resultxml));
        });
      });
    } else

    if (data.event == 'SCAN') {
      //  扫描关注事件
      var url = "http://wfj.miemietech.com/socketUtils/weixinscanok?sid="
        + data.eventkey + "&openid=" + data.fromusername;
      console.log(url);
      var content = "<a href='" + url + "'>登录</a>";
      var resultxml = {
        "xml": {
          "ToUserName": data.fromusername,
          "FromUserName": data.tousername,
          "CreateTime": time,
          "MsgType": "text",
          "Content": content,
          "FuncFlag": 0
        }
      };
      callback(builder.buildObject(resultxml));
    } else {
      callback(null);
    }
    //callback(builder.buildObject(resultxml));
  },
  /**
   * 
   * 
   * 
   */
  getSceneID: function (sessionid) {
    var promise = new Promise(function (resolve, rejected) {
      //get randamid
      let rndint = commonUtilsServices.getRandomInt(1, 100000);
      SessionScanInfo.findOne({ sessionID: sessionid })
        .then(data => {
          if (data)
            resolve(data);
          else {
            //生成rndint 直到 符合条件为止，2
            var count = 0;
            let dataresult = {};
            async.whilst(
              function () {
                rndint = commonUtilsServices.getRandomInt(1, 100000);
                return count < 9;
              },
              function (callback) {
                count++;

                SessionScanInfo.create({ sessionID: sessionid, sceneID: rndint })
                  .then(data => {
                    count = 10;
                    dataresult = data;
                    callback();;
                  })
                  .catch(err => {
                    console.log(err);
                  });

              },
              function (err) {
                if (err)
                  rejected(err);
                else
                  resolve(dataresult);
                // 5 seconds have passed
                console.log(err);
              }
            );
          }
        })
        .catch(err => {
          console.log(err);
          rejected(err);
        })
    });
    return promise;
  },
}