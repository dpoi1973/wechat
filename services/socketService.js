var config = require('../config');
var models = require('../models');
var request = require('request');
var User = models.OAUser;
var SessionScanInfo = models.SessionScanInfo;
exports.wechatPerson = function (wechatid, callback) {
    User.findOne({ wechatid: wechatid })
      .then(data => {
        return callback(data);
      })
      .catch(err => {
          console.log(err);
      })
}


exports.getSessionId = function (sessionID, callback) {
    SessionScanInfo.findOne({sessionID: sessionID})
    .then(data => {
        return callback(data);
    })
    .catch(err => {
      console.log(err);
    })
}


exports.updateSessionId = function (sessionID, wechatid, callback) {
    SessionScanInfo.update({sessionID: sessionID},{wechatid: wechatid})
    .then(data => {
        return callback(data);
    })
    .catch(err => {
      console.log(err);
    })
}

exports.updateEmpinfo = function (sessionID, empinfo, username,userid, callback) {
    SessionScanInfo.update({sessionID: sessionID},{empinfo: empinfo,username: username,wechatid: userid})
    .then(data => {
        return callback(data);
    })
    .catch(err => {
      console.log(err);
    })
}


exports.getempinfoByOpenid = function (openid, callback) {
    request.get(`http://192.168.0.70:3001/api/tblempinfos/getempinfoByOpenid?Openid=${openid}`,function(err,data){
            return callback(data.body);
    });
}


exports.relempinfoByOpenid = function (openid,empid, callback) {
    request.get("http://192.168.0.70:3001/api/tblempinfos/relempinfoByOpenid?Openid="+openid+"&empid="+empid,function(err,data){
            console.log(err);
            return callback(JSON.parse(data.body));
    });
}

exports.valuser = function (loginUser,loginPassword, callback) {
    request.get("http://192.168.0.70:3001/api/commonYwApis/valuser?loginUser="+loginUser+"&loginPassword="+loginPassword,function(err,data){
            if(data.body == "" || data.body == "[]"){
                return callback(null);
            }else{
                return callback(JSON.parse(data.body)[0]);
            }
    });
}
