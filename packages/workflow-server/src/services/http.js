const http = require('http');

export function start() {
  http
    .createServer(function(req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Connecting to workflow');
    })
    .listen(9876);

  console.log('starting http on localhost:9876');
}
