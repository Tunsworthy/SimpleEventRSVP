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
    set: encrypt,
  },
  lastname: {
    type: String,
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
    default: 1
  },
});

module.exports = mongoose.model('Person', PersonSchema);
