var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var UserSchema = new Schema({
    //微信名称,
    nickname:{type:String},
    //微信唯一ID 企业号是通讯录 id
    wechatid:{type:String},
    //OA密码 MD5
    password:{type:String},
    //OA用户名
    username:{type:String},
    //OA员工姓名
    empname:{type:String},
    //万历外键
    empid:{type:String},
    //创建日期
    createdate:{type:Date,default:Date.now}
})
UserSchema.index({username:1},{unique: true})
UserSchema.index({wechatid:1},{unique: true})
mongoose.model("oauser",UserSchema)