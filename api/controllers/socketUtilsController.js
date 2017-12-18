'use strict';
module.exports = {
  reglogin: function (req, res) {
    if (!req.isSocket) {
      return res.badRequest();
    }
    // Have the socket which made the request join the "funSockets" room

    sails.sockets.join(req, req.sessionID);


    // Broadcast a "hello" message to all the fun sockets.
    // This message will be sent to all sockets in the "funSockets" room,
    // but will be ignored by any client sockets that are not listening-- i.e. that didn't call `io.socket.on('hello', ...)`
    sails.sockets.broadcast('sessionid', 'reglogin', { id: 'hello' }, req);
    // Respond to the request with an a-ok message
    return res.ok();
  },

  weixinscanok(req, res) {
    var sid = req.query['sid'];
    var openid = req.query['openid'];
    console.log(sid + "--->>" + openid);
    SessionScanInfo.findOne({ sceneID: sid })
      .then(data => {
        req.session['openid'] = openid;
        if (data) {
          data.openid = openid;
          data.save(function (err) {
            if (err) {
              res.send(err);
            } else {
              sails.sockets.broadcast(data.sessionID, 'reglogin', { id: 'loginok' }, req);
              res.json(data);
            }
          });
        }
      })
      .catch(err => {
        res.json(err);
      })
  },
}