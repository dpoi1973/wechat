/**
 * WeixinmainControllerController
 *
 * @description :: Server-side logic for managing weixinmaincontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require('request');
var wechat = require('wechat');
var config = {
    token : 'klfd432lksa432jfkl343920fkdlsa',
    appid : 'wx14837c48d963e578',
    encodingAESKey : 'oHHOTWOyyDC0nzcnJvunIqD7JKjrcSiAhoFaUNDEXxK'
};
var WechatAPI = require('wechat-api');
var api = new WechatAPI(weixinCommonServices.appid, weixinCommonServices.appsecret);
var template_list = { "template_list": [{ "template_id": "Se0FkPYU-4qoeVNz5-4To0Q8ew95s3ip7MkAaEXhM_E", "title": "test", "primary_industry": "", "deputy_industry": "", "content": "德尔{{}}", "example": "" }, { "template_id": "qBtTqDQ0gOf11rTU7vM3qfoF7VOIH4xef62PqOnCXrU", "title": "报关状态跟踪", "primary_industry": "", "deputy_industry": "", "content": "报关单[{{baoguanDZNO.DATA}}]最新状态为[{{status.DATA}}]\n点击详情<\/a>查看", "example": "" }, { "template_id": "wz3_8iFecMk87kioSg9zk_MoyVRZ_0k4_OZV24Am1ZU", "title": "订单支付成功", "primary_industry": "IT科技", "deputy_industry": "互联网|电子商务", "content": "{{first.DATA}}\n\n支付金额：{{orderMoneySum.DATA}}\n商品信息：{{orderProductName.DATA}}\n{{Remark.DATA}}", "example": "我们已收到您的货款，开始为您打包商品，请耐心等待: )\n支付金额：30.00元\n商品信息：我是商品名字\n\n如有问题请致电400-828-1878或直接在微信留言，小易将第一时间为您服务！" }, { "template_id": "BGKn_VkRpwrXUAGfZL1CY_UEJ-GZPx8gxdmoeuMyCXw", "title": "购买成功通知", "primary_industry": "IT科技", "deputy_industry": "互联网|电子商务", "content": "您好，您已购买成功。\n\n商品信息：{{name.DATA}}\n{{remark.DATA}}", "example": "您好，您已购买成功。\n\n商品信息：微信影城影票\n有效期：永久有效\n券号为QQ5024813399，密码为123456890" }, { "template_id": "yQwK7KR2V2GYiakG1_yWsDqDkc29g4PtEP3uOP2qWLU", "title": "购买成功通知", "primary_industry": "IT科技", "deputy_industry": "互联网|电子商务", "content": "您好，您已购买成功。\n\n商品信息：{{name.DATA}}\n{{remark.DATA}}", "example": "您好，您已购买成功。\n\n商品信息：微信影城影票\n有效期：永久有效\n券号为QQ5024813399，密码为123456890" }] };
api.sendText("oIe38s97sQSpL0BVeM68S5o_ZEGc", "oye", function(err, result) { 
        console.log("2"+err);
         console.log("2 "+JSON.stringify(result));
});
module.exports = {
  /**
   * `WeixinmainControllerController.pmweixin()`
   */
  pmweixin: function (req, res) {
    var echostr = req.query.echostr;
    // console.log(echostr);
    var signaturestr = req.query.signature;
    var timestampstr = req.query.timestamp;
    var nonce = req.query.nonce;
    if (echostr != null && weixinCommonServices.verifyEchostr(signaturestr, timestampstr, nonce)) {
      console.log(echostr);
      res.send(echostr);
    } else
      res.send('Hello MI');
  },

  weixinService: wechat(config,function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    console.log('log :', message);
    res.reply('hehe');
  }),
  /**
   * 
   * 
   */
  getFollowers: function (req, res) {
    var next_openid = req.query.next_openid || '';
    api.getFollowers(next_openid, function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    })
  },

  sendMessage: function (req, res) {
    var openid = req.query.openid;
    var templateId = req.query.templateid;
    var data = {};
    var url = "http://www.baidu.com";
    var tempId = template_list.template_list;
    for (var i = 0; i < tempId.length; i++) {
      if (tempId[i].template_id == templateId) {
        var str = tempId[i].content;
        var result = str.match(/{{\w+.DATA}}/g); //没有使用g选项   
        var temp = "{";
        for (var i = 0; i < result.length; i++) {
          //console.log(result[i]);
          if (i == (result.length - 1)) {
            temp += '"' + result[i].slice(2, result[i].length - 7) + '": {"value":"' +
              req.param(result[i].slice(2, result[i].length - 7)) + '","color":"#173177"}}';
          } else {
            temp += '"' + result[i].slice(2, result[i].length - 7) + '": {"value":"' +
              req.param(result[i].slice(2, result[i].length - 7)) + '","color":"#173177"},';
          }
        }
        data = JSON.parse(temp);
        break;
      }
    }

    api.sendTemplate(openid, templateId, url, data, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  },

  createTmpQRCode: function (req, res) {
    api.createTmpQRCode(999, 1800, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  },

  batchGetUsers: function (req, res) {
    var openids = req.query.openids || '';
    console.log(openids);
    api.batchGetUsers(openids, function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  },

  getUsers: function (req, res) {
    var next_openid = req.query.next_openid || '';
    var openids = req.query.openids || '';
    api.getFollowers(next_openid, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        //  res.send(result.data.openid);
        api.batchGetUsers(result.data.openid, function (err, data) {
          if (err) {
            res.send(err);
          } else {
            res.send(data);
          }
        });
      }
    })
  },
  addTemplate: function (req, res) {
    var templateIdShort = 'TM00001';
    api.addTemplate(templateIdShort, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  },
  /**
   * Data:2016/09/09
   * Name:XiongNeng
   * Email:1157052375@qq.com
   */
  getAllPrivateTemplate: function (req, res) {
    // 获取access_token
    //var access_token = "OCqHLaJUIKX5TNdWcSWlENvz2YJh_utpH8wUqHKDEoaVhkKHQSqf1Rb3G_iJz9v0raPRz2uil6MPCXiW4LfskutyD4TAPHTqTllJtXhGzmPzYk8sFJz4qenWvW0_TlrNIABiAIAXPQ";
    //  var token_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + weixinCommonServices.appid + "&secret=" + weixinCommonServices.appsecret;
    //var template_url = "https://api.weixin.qq.com/cgi-bin/template/get_all_private_template?access_token="+access_token;
    //request.get(template_url, function (error, response, body) {
    //  if (!error && response.statusCode == 200) {
    //    res.send(body);
    // }
    //});

    res.send(template_list);
  },
  dologin: function (req, res) {
    var tt = weixinCommonServices.getSceneID(req.sessionID).then(data => {
      api.createTmpQRCode(data.sceneID, 1800, function (err, result) {
        if (err) {
          res.send(err);
        } else {
          console.log(data);
          res.view('scanlogin', { name: result.ticket });
        }
      });
    }).catch(err => {
      res.json(err);
    })
  },
  /**
   * Data:2016/09/09
   * Name:XiongNeng
   * Email:1157052375@qq.com
   */
  add: function (req, res) {
    var openid = req.param("openid");
    var username = req.param("username");
    var phone = req.param("phone");
    var company = req.param("company");
    if (openid != null && username != null && phone != null && company != null) {
      var petitioner = {
        "openid": openid,
        "username": username,
        "tel": phone,
        "company": company
      };
      console.log(petitioner);
      //  res.send(petitioner);
      Petitioner.find({ openid: openid }).exec(function (error, result) {
        if (error) {
          res.send(error);
        } else {
          if (result.length > 0) {
            res.send("恭喜你，你已经成为会员用户");
          } else {
            Petitioner.create(petitioner).exec(function (err, records) {
              if (err) {
                res.send(err);
              } else {
                res.send("success!!");
              }
            });
          }
          /*
          if (result != null) {
              res.send("跳转到用户详情页面");
          } else {
              
          }*/
        }
      });
    } else {
      res.send("你的数据有问题！！");
    }
  },
  /**
   * 2016/09/01
   * Name: XiongNeng
   * Email: 1157052375@qq.com
   * Function:
   * Param:
   */
  loginOk: function (req, res) {
    SessionScanInfo.findOne({ sessionID: req.sessionID }).then(data => {
      if (data) {
        //  登录成功
        var openid = data.openid || "";
        SessionScanInfo.destroy({ openid: openid }).exec(function (err) {
          api.getUser(openid, function (err, result) {
            if (err) {
              res.send(err);
            } else {
              result.status = 0;
              User.findOne({ openid: result.openid }).exec(function (err, record) {
                if (err) {
                  return res.send(err);
                } else {
                  if (record == null) {
                    result.status = 0;
                    User.create(result).exec(function (err, records) {
                      if (err) {
                        return res.send(err);
                      }
                    });
                  } else {
                    if (record.status == 1) {
                      return res.view('user/userInfo', result);
                    }
                  }
                  return res.send("欢迎时我们的系统！请等待>>>我们的服务人员---为你服务！");
                }
              });/*
              User.findOrCreate({ openid: result.openid }, result).exec( function createFindCB(error, createdOrFoundRecords){
                  console.log('What\'s cookin\' ' + createdOrFoundRecords + '?');
                if (err) {
                  res.send(err);
                } else {
                  res.view('user/userInfo', result);
                }
                
              });*/
            }
          });
        });
      } else {
        //  登录失败
        res.redirect("/weixinmain/dologin");
      }
    });
  },
  sendLogliOk: function (req, res) {
    var openid = req.query.openid;
    api.sendText(openid, 'Hello world');
  },
  getPersons(req, res) {
    var page = req.query.page || 0;
    User.find({}).exec(function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  },
};