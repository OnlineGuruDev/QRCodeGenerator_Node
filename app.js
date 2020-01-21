var express = require('express');
var QRCode = require('qrcode');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var cloudiRouter = require('./routers/imageRoutes');
var mongoose = require('mongoose');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('QR code generator API')
});

// connecting to mongo database
mongoose.connect('mongodb://heroku_jd2qwl2k:bgpp2ousim56i7nre8ipn0q7ok@ds253398.mlab.com:53398/heroku_jd2qwl2k');
mongoose.connection;
                      
//Handling cors errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headeres', '*');
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
    return res.status(200).json({})
  }
  next();
})

app.use('/uploads', cloudiRouter);

//Handle Error
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app;

// QRCode.toDataURL('I am a pony!', function (err, url) {
//   console.log(url)
// })


// // app.listen(port);
// server.listen(port, () => {
//   console.log('server running on ' + port)
// })