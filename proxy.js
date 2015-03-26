var httpProxy = require ('http-proxy'), 
	http = require('http');

var redis = require('redis')
var client = redis.createClient(6379, '127.0.0.1', {})

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

  
  var target = { target: addresses.shift() };

  console.log("target is " + target);

  //
  // ...then proxy to the server whose 'turn' it is...
  //
  console.log('balancing request to: ', target);

  //currentTarget = target.host + target.port;

  //client.lpush(currentTarget, 'task');

  proxy.web(req, res, target);



  //
  // ...and then the server you just used becomes the last item in the list.
  //
  addresses.push(target.target);
}).listen(8021);
