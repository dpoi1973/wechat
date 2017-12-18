/**
 * SessionScanInfo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    sessionID: {
      type: 'string',
      size: 50,
      unique: true
    },
    sceneID: {
      type: 'integer',
      unique: true
    },
    openid: {
      type: 'string',
      size: 50
    },
    createdate: {
      type: 'datetime',
      defaultsTo: function () {
        return (new Date());
      }
    }
  }
};