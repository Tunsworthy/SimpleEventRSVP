'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require('fs');
var publickey = fs.readFileSync('./rsvppublic.pem').toString();

function encrypt(text){
  var buffer = Buffer.from(text);
  var encrypted = crypto.publicEncrypt(publickey, buffer);
  return encrypted.toString("base64");
};

var PersonSchema = new Schema({
  firstname: {
    type: String,
    required: 'firstname',
  set: encrypt,

  },
  lastname: {
    type: String,
    required: 'lastname',
    set: encrypt,
  },
  email: {
    type: String,
    set: encrypt,
  },
  phone: {
    type: String,
    set: encrypt,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  attending: {
    type: Boolean,
    default: 0
  },
});
var EncryptSchema = new Schema({
  key:{
    type:String
  }
});

PersonSchema.set('toObject', { getters: true });
PersonSchema.set('toJSON', { getters: true });

module.exports = mongoose.model('Person', PersonSchema);
