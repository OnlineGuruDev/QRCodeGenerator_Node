var http = require('http');
var app = require('./app');

const port = process.env.PORT || 3002;

const server = http.createServer(app);

// app.listen(port);
server.listen(port, () => {
  console.log('server running on ' + port)
})