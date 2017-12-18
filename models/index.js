/**
 * Created by zp on 2015/6/29.
 */
var mongoose = require('mongoose');
var config   = require('../config');
var options = {
    
    server:
    { socketOptions: { keepAlive: 1, connectTimeoutMS: 0 }
        ,poolSize:100},
    replset:
    {   ha: true, // Make sure the high availability checks are on
        haInterval: 5000, 
        socketOptions:
        { keepAlive: 1, connectTimeoutMS : 0 }

    }
    };
    
mongoose.Promise = require('bluebird');
mongoose.connect(config.db,options, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);

    }
});

if (mongoose.connection.db.serverConfig.s.replset) {
  mongoose.connection.db.serverConfig.s.replset.on('ha', function(type, data) {
    console.log('replset ha ' + type);
  })
}
require("./User")
require("./SessionScanInfo")
require("./Locationtest")

exports.SessionScanInfo =  mongoose.model("SessionScanInfo")
exports.OAUser=mongoose.model("oauser")
exports.Locationtest=mongoose.model('Locationtest')

if(require.main ==module){
    exports.OAUser.find({},function(err,obj){
        obj = obj
        exports.OAUser.find({},function(err,obj){
            obj = obj
        })
    })

   var zz = new   exports.signinoutlog()
    zz = zz
}

