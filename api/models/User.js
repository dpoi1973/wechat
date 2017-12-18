/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'openuser',
  attributes: {
    subscribe: {
      type:'integer',
    },
    openid: {
      type: 'string',
      size: 100,
      primaryKey:true,
    },
    nickname: {
      type: 'string',
      size: 50
    },
    sex: {
      type: 'integer',
    },
    language: {
      type: 'string',
      size: 50
    },
    city: {
      type: 'string',
      size: 50
    },
    province: {
      type: 'string',
      size: 100
    },
    country: {
      type: 'string',
      size: 100
    },
    headimgurl: {
      type: 'string',
      size: 200
    },
    subscribe_time: {
      type: 'string',
      size: 100
    },
    remark: {
      type: 'string',
      size: 100
    },
    groupid: {
      type: 'string',
      size: 50
    },
    status:{
      type:'integer',
      defaultsTo: 0
    },
    mgrOpenid:{
      type: 'string',
      size: 100,
    }
  }
};

