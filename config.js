/**
 * Created by zp on 2015/6/19.
 */
var path = require('path');
var _    = require("lodash")
var config = null
// if(process.env.NODE_ENV=="release"){
//     config = require("./config.release")
//     module.exports = config;
//     return
// }
config={
    //监听端口a
    port:1337,
    //url的端口
    urlport:'',
    //第一次回调绑定的时候为true,否则false
    qy_first_callback:false,
    debug:false,
    debugrequest:false,
    //企业应用配置
    Application:{
        //企业应用ID
        agentid:9,
        token:'klfd432lksa432jfkl343920fkdlsa',
        encodingAESKey:'oHHOTWOyyDC0nzcnJvunIqD7JKjrcSiAhoFaUNDEXxK',
        corpId:'wxc235846a7eeb4780'
    },
    //三个corpId保持一致
    corpId:'wxc235846a7eeb4780',
    corpSecret:'U7BUuhIY26NsmnfA1Of2s4Jgz00Xo9OCCaoQ8QWDK09V9RMsFgrJLDBJsrF4BkgJ',
    SessionSecret:'qyWLSH',
    SessionConfig:{
        host:'192.168.0.14',
        post:27017,
        db:'WechatDB_qy',
        collection:'sessions',
        url:'mongodb://192.168.0.14/WechatDB_qy'
    },
    //加密 解密 配置
    encrypt:{
        algorithm:'aes-128-ecb',
        key:'wlsh',
        clearEncoding:'utf8',
        cipherEncoding:'base64'
    },
    apiconfig : {
    token: 'klfd432lksa432jfkl343920fkdlsa',
    encodingAESKey: 'oHHOTWOyyDC0nzcnJvunIqD7JKjrcSiAhoFaUNDEXxK',
    corpId: 'wxc235846a7eeb4780'
    },
    // mongodb 配置
    db: '192.168.0.14/WechatDB_qy',
    // //有高级权限的部门
    // powerDepart:['万历报关','软件部'],
    // //powerList 高级权限列表
    // powerList:[{
    //     name:'推送消息',
    //     url:'/application/power/pull'
    // },{name:'帐号管理',url:'about:blank'}],
    // //根部门 ID
    // root_depart_id:1,
    // //打开网页的过期时间
    // page_expired_time:60*60*60*1000,
    // //和微信服务端 交互 超时时间
    // wechat_timeout:2*1000,

    // // redis 配置，默认是本地
    // redis_host: '127.0.0.1',
    // redis_port: 6379,
    // redis_db: 0
}
if(config.debug){
    config.page_expired_time =  160*60*100000
}
var url = {
    //和业务系统对接配置
    // //自定义header 密文
    // yw_header:'wlsh',

    // yw_host:'192.168.0.30',
    // yw_port:8086,
    // //业务系统获取帐号url path
    // yw_account_path:'/api/WeChatDataExchange/GetUser',
    // //业务系统未完成url
    // yw_nofinish_get_path:'/api/WeChatDataExchange/GetNoFinish',
    // //业务系统扣分 url
    // yw_koufen_get_path:'/api/WeChatDataExchange/GetKouFen',
    // //业务系统详细界面  url
    // yw_koufenPreList_get_path:'/api/WeChatDataExchange/GetKouFenPreList',
    // //通过报关单查询报关数据
    // yw_pre_entry_id_get_formhead:'/api/WeChatDataExchange/GetFormHead',
    // //业务判断是否有权限 审核
    // yw_koufen_power_list:'/api/WeChatDataExchange/GetKoufenPowerList',
    // //业务扣分审核 详细
    // yw_koufen_detail : '/api/WeChatDataExchange/GetKouFenDetail',
    // //业务扣分审核备注 详细
    // yw_koufen_memo_detail : '/api/WeChatDataExchange/GetDutyMemos',
    // //找业务系统员工
    // yw_empinfo:'/api/user/GetEmpForEmpName',
    // //保存扣分审核记录
    // yw_save_koufen: '/api/WeChatDataExchange/SaveDutyScoreLogData',
    // //保存扣分审核备注
    // yw_save_koufen_memo:'/api/WeChatDataExchange/SaveDutyScoreLogMemo',

    // //oa系统对接
    // oa_header:'wlsh',
    // oa_host:'192.168.0.30',
    // oa_port:8086,
    // //业务系统获取帐号url path
    // oa_account_path:'/api/WeChatDataExchange/GetOAUser',
    // //OA 获取未读工作流
    // //oa_workflowremind:'/api/WeChatDataExchange/GetWorkFlowRemind',
    // //OA K币
    // oa_kcoin:'/api/WeChatDataExchange/GetKCoin',
    // //签到服务器时间
    // oa_signinoutgetserverdate:'/api/WeChatDataExchange/GetNow',
    // //今天 签到/签退状态
    // oa_signinouttoday:'/api/WeChatDataExchange/OATodaySign',
    // //签到/签退
    // oa_signinout:'/api/WeChatDataExchange/OASignOut',
    // //获取所有工作流
    // oa_workflowbases:'/api/oa/GetOAWorkFlowBaseList',
    // //获得所有工作流类型
    // //oa_workflowtypes:'/api/oa/GetOAWorkFlowTypes',
    // //获得当前工作流所有字段
    // oa_workflowbillfields:'/api/oa/GetOAWorkFlowBillField',
    // //获得流程提醒
    // oa_workflowremind:'/api/oa/GetOAWorkFlowRemind',
    // //流程提醒数据返回
    // oa_workflowremindback:'/api/oa/PostBackWorkFlowRemind',
    // //OA数据库中员工部门
    // oa_workflowflowdepart:'/api/oa/GetUserDepart'
}
_.extend(config,url)
module.exports = config;