var models = require('../models');
var User = models.OAUser;
var Locationtest = models.Locationtest;
exports.responseEvent = function (data, callback) {
    
    if (data.EventKey == "poll_poll") {
      User.findOne({ wechatid: data.FromUserName })
      .then(data => {
           var pp = {
              "名称": data.empname,
              "oa账号": data.username
           }
           return callback(pp);
      })
      .catch(err => {
          console.log(err);
      })
    } else if (data.EventKey == "baidu") {
        return callback('location');
    } else if (data.EventKey == "god") {
        return callback('you');
    }
    else if(data.Event == 'LOCATION'){
        Locationtest.find({wechatid:data.FromUserName}).sort({_id:-1}).limit(10)
        .then(result => {
            console.log('test ok')
            console.log(result.length);
            for(var i =0;i<result.length;i++){
                console.log(result[i])
                console.log(data.CreateTime - result[i].createtime)
                if((data.CreateTime - result[i].createtime)<5&&(data.CreateTime - result[i].createtime)>0){
                    return Locationtest.update({wechatid:data.FromUserName,createtime:result[i].createtime},{LOCATION:data})
                }
            }
        })
        .then(ff => {
            // console.log(ff)
        })
        .catch(err => {
            console.log(err);
        });
    }else if(data.Event == 'enter_agent'){
        // console.log(data)
        Locationtest.findOne({wechatid:data.FromUserName,createtime:data.CreateTime})
        .then(result => {
            // console.log(result)
            if(!result){
                var locationtest = {};
                locationtest.wechatid = data.FromUserName;
                locationtest.createtime = data.CreateTime.toString();
                locationtest.enter_agent = [];
                locationtest.enter_agent.push(data);
                Locationtest.entry = '测试';
                return Locationtest.create(locationtest);
            }else{
                console.log('in enter')
                return Locationtest.update({wechatid:data.FromUserName},{enter_agent:data})
            }
        })
        .then(ff => {
            // console.log(ff)
        })
        .catch(err => {
            console.log(err);
        });
    }
};

exports.selectPerson = function (name, callback) {
     User.findOne({ "empname": name })
      .then(data => {
           return callback(data);
      })
      .catch(err => {
          console.log(err);
      })

}