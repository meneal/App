var httpProxy = require ('http-proxy'), 
	http = require('http');

var addresses = [
  {
    host: 'localhost',
    port: 3000
  },
  {
    host: 'localhost',
    port: 3001
  }
];
var proxy = httpProxy.createServer();

http.createServer(function (req, res) {
  //
  // On each request, get the first location from the list...
  //
  var target = { target: addresses.shift() };

  //
  // ...then proxy to the server whose 'turn' it is...
  //
  console.log('balancing request to: ', target);
  proxy.web(req, res, target);

  //
  // ...and then the server you just used becomes the last item in the list.
  //
  addresses.push(target.target);
}).listen(80);
