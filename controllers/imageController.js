
var QRModel = require('../models/QRcode');
var QRCode = require('qrcode');
var cloud = require('../cloudinaryConfig');

exports.createApp = (req, res) => {
  QRCode.toFile('public/images/' + req.body.imageName + '.png', req.body.uri, function (err) {
    try{
      var imageDetails = {
        imageName: req.body.imageName,
        imageURL: 'public/images/' + req.body.imageName + '.png',
        uri: req.body.uri
      }      
  
      QRModel.find({uri: imageDetails.uri}, (err, callback) => {
        if(err) {
          res.json({
            err: err,
            message: 'there was a problem uploading image'
          })
        } else if(callback.length >=1 ) {
          res.json({
            message:'file already exist'
          })
        } else {
          cloud.uploads(imageDetails.imageURL).then((result) => {
            if(!result) {
              res.json({
                err: err,
                message: 'cloud not upload image, try again'
              })
            } else {
              var imageDetails = {
                imageURL: result.url,
                uri: req.body.uri
              }
              QRModel.create(imageDetails, (err, created) => {
                if(err) {
                  res.json({
                    err: err,
                    message: 'cloud not upload image, try again'
                  })
                } else {
                  res.json({
                    created: imageDetails,
                    message: 'image uploaded successfully!!'
                  })
                }
              })
            }
          })
        }
      })
    } catch(execptions) {
      console.log(execptions);
    }    
  })  
}