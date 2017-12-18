var config                  = require('../../config')
var wechat                  = require('wechat-enterprise')
var wechatServices          = require('../../services/wechatService')
var oamssqlServices         = require('../../services/oamssqlService')
var triggerMessage          = require('./triggerMessage')
var schedule                = require('node-schedule')
var async                   = require('async')

exports.responseMessage = wechat(config.apiconfig,wechat.event(function (message, req, res, next) {
    wechatServices.responseEvent(message, function (result) {
    // triggerMessage.findDZ("江汉");
    // console.log(result);  
    if(result == 'location'){
        res.render("err",{err:'e'});
    } else     
        if(result){
            result = JSON.stringify(result);
            res.reply({type: "text", content: result});
        }else {
            res.render("err",{err:"err"});
        }
    });
}));

function transdate(date){
   var y = date.getFullYear();  
   var m = date.getMonth() + 1;  
   m = m < 10 ? ('0' + m) : m;  
   var d = date.getDate();  
   d = d < 10 ? ('0' + d) : d;  
   var h = date.getHours();  
   var minute = date.getMinutes();
   var second = date.getSeconds(); 
   h = h < 10 ? ('0' + h) : h; 
   minute = (minute + 10) > 60 ? ('0' + (minute - 50)) : (minute + 10);
   h = (minute + 10) > 60 ? (h + 1) : h;
   second = second < 10 ? ('0' + second) : second;  
   return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
};



function transdate1(date){ 
   var y = date.getFullYear();  
   var m = date.getMonth() + 1;  
   m = m < 10 ? ('0' + m) : m;  
   var d = date.getDate();  
   d = d < 10 ? ('0' + d) : d;  
   var h = date.getHours();  
   var minute = date.getMinutes();
   var pp = minute.toString();
   var ss = pp.substring(1,2);
   var second = date.getSeconds(); 
   minute = (minute + 20) > 60 ? ('0' + (ss)) : (minute + 20);
   h = (minute + 20) > 60 ? (h + 1) : h;
   h = h < 10 ? ('0' + h) : h;
   second = second < 10 ? ('0' + second) : second;  
   return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
};


var rule = new schedule.RecurrenceRule();  
rule.minute = [01,10,20,30,40,50];
rule.hour = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
var j = schedule.scheduleJob(rule, function(){
    var date = new Date();
    var date1 = transdate(date);
    var date2 = transdate1(date);
    var day = date1.substring(0,10);
    var time = date1.substring(11,16);
    var time2 = date2.substring(11,16);
    var data = {
        begindate:day,
        begintime:time,
        endtime:time2
    };
    oamssqlServices.findworkplan(data,function (err,resa) {
        async.mapSeries(resa,function(aa,call){
            async.mapSeries(aa.username,function(zz,callback){
                console.log(zz);
                triggerMessage.sendpaln(zz,aa.begintime,aa.endtime,aa.name,aa.creatername,aa.description);
                callback(null,'dd');
            },function(err,result){
                call(null,'ok');
            });
        });
    })
})