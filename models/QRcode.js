var mongoose = require('mongoose');
var imageupload = mongoose.Schema({
  imageURL: {
    type: String,
    required: true
  },
  uri: {
    type: String,
    required: true
  },
  post_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('QRcode', imageupload);