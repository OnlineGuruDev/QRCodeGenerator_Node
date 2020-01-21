const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'sixbitlabs',
  api_key: '636347775685229',
  api_secret: 'I4R5eGpJ2RoyK8VuCJv3kZUpqr4'
})

exports.uploads = (file) => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) => {
      resolve({url: result.url, id: result.public_id})
    }, {resource_type: 'auto'})
  })
}