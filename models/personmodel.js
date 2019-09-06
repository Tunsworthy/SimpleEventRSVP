'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
  firstname: {
    type: String,
    required: 'firstname',
    min: 1,
    max:10
  },
  lastname: {
    type: String,
    required: 'lastname',
  },
  email: {
    type: String,
  },
  phone: {
    type: String
  }
});

module.exports = mongoose.model('Person', PersonSchema);
