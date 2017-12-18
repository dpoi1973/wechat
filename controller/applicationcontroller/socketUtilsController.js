var SessionScanInfo = require('../../models/SessionScanInfo').SessionScanInfo;
var socketService = require('../../services/socketService')
var wechat                          = require('wechat-enterprise');
var config                          = require("../../config");
var API = wechat.API;
var api = new API(config.corpId,config.corpSecret,config.Application.agentid);
exports.qr = function(req,res) {
     socketService.getSessionId(req.query.state,function(results){
            if(results){
                 api.getUserIdByCode(req.query.code, function(err, data){
                     //invalid access_token
                     console.log(data);
                     socketService.getempinfoByOpenid(data.UserId,function(result){
                         console.log(result);
                        if(result == "null" || result == null){
                            res.render("login",{userid:data.UserId,session:results.sessionID});
                        }else{
                            socketService.updateEmpinfo(results.sessionID,JSON.parse(result),'',data.UserId,function(re){
                            socketService.updateSessionId(results.sessionID,data.UserId,function(re){
                                var id = '';
                                for(var i = 0; i < Clients.length; i++){
                                    if(results.sessionID == Clients[i].session){
                                        id = Clients[i].id;
                                    }
                                }
                                if(id!=''){
                                    var uurl  = `http://wfj.miemietech.com/login?id=${id}`;
                                    // res.render("login",{userid:data.UserId,session:results.sessionID});
                                    res.render("test",{result: uurl});
                                }else{
                                    res.render("err",{err: "二维码失效"});
                                }
                            })
                            })
                        }
                     })
                    // socketService.wechatPerson(data.UserId,function(result){
                    //     if(result){
                    //         // var oop = {};
                    //         // oop.empid = result.empid;
                    //         // oop.empname = result.empname;
                    //         // oop.wechatid = result.wechatid;
                    //         // oop.sessionID = results.sessionID;
                    //         socketService.updateSessionId(results.sessionID,result.wechatid,function(data){
                    //             console.log(result.wechatid);
                    //             var id = '';
                    //             for(var i = 0; i < Clients.length; i++){
                    //                 if(results.sessionID == Clients[i].session){
                    //                     id = Clients[i].id;
                    //                 }
                    //             }
                    //             if(result.wechatid){
                    //                 var uurl  = `http://wfj.miemietech.com/login?id=${id}&empname=${result.empname}`;
                    //                 console.log(uurl)
                    //                 res.render("test",{result: uurl});
                    //             }else{
                    //                 res.render("login",{result:'请先关注'});
                    //             }
                    //         })
                    //     }else{
                    //         res.render("err",{ err:"请先关注!" });
                    //     }
                    // })
                })
            }else{
                res.render("err",{ err:"faild" });
            }
    })
   
}


exports.login = function(req,res) {
    var id = req.query.id;
    var socket = {};
    for(var i = 0; i < Clients.length; i++){
        if(id == Clients[i].id){
            socket = Clients[i].socket;
        }
    }

    if(socket){
        socket.emit('renderhtml',"登陆成功");
    }else{
        res.render('err',{err:'登录失败'});
    }
}


exports.baidu = function(req,res) {
    res.render('local',{x:121.609207,y:31.315334});
}

exports.loginHandle = function(req,res) {
   var data = req.query;
   socketService.valuser(data.username,data.password, function(result){
       console.log(result);
       if(result == null){
           res.render("err",{err: "用户名或密码错误!"});
       }else{
           socketService.updateEmpinfo(data.session,result,data.username,data.userid,function(re){
               console.log(2323232);
               console.log(re);
           })
            socketService.relempinfoByOpenid(data.userid,result.Empid, function(result){
                if(result.count == 1){
                    var id = '';
                        for(var i = 0; i < Clients.length; i++){
                            if(data.session == Clients[i].session){
                                id = Clients[i].id;
                            }
                        }
                        var uurl  = `http://wfj.miemietech.com/login?id=${id}`;
                        res.render("test",{result: uurl});
                }else if(result.count == 0){
                    res.render("err",{err: "该账号已经绑定，请联系软件部叶海富！"});
                }else{
                    res.render("err",{err: "失败"});
                }
            })
       }
   })
}


var globalsocket = {};
var Clients = []
module.exports.socket = function (socket) {
  globalsocket = socket;
  globalsocket.sockets.on('connection', (socket) => {
    socket.on('session', (data) => {
        for (let i = 0; i < Clients.length; i++) {
            if (Clients[i].id == socket.id) {
                Clients.splice(i, 1);
            }
        }
        var pp = {};
        pp.id = socket.id;
        pp.session = data;
        pp.socket = socket;
        Clients.push(pp);
        console.log(Clients);
    });
     socket.on('disconnect', (data) => {
         console.log(data,'disconnect');
        for (let i = 0; i < Clients.length; i++) {
            if (Clients[i].id == socket.id) {
                Clients.splice(i, 1);
            }
        }
     })
})
};

