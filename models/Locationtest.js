var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var Locationtest = new Schema({
    createtime:{type:String},
    wechatid:{type:String,default:null},
    enter_agent:{type:Object,default:null},
    LOCATION:{type:Object,default:null},
    //创建日期
    createdate:{type:Date,default:Date.now}
})
Locationtest.index({createtime:1},{unique: true})
mongoose.model("Locationtest",Locationtest)