var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var SessionScanInfo = new Schema({
    sessionID: {
      type: String
    },
    wechatid: {
      type: String
    },
    empinfo: {
      type: Object
    },
    username: {
      type: String
    },
    createdate: {
      type: Date,
      default:Date.now
    }
})
//WechatRes.index({msgId:1},{unique: true})
SessionScanInfo.index({sessionID:1},{unique: true})
mongoose.model("SessionScanInfo",SessionScanInfo)