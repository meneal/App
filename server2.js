var express = require('express');
var app = express();

var redis = require('redis')
var client = redis.createClient(6379, '127.0.0.1', {})

var multer = require('multer'); 
var fs = require('fs');

client.set("key", "value");
client.get("key", function(err,value){ console.log(value)});





var server = app.listen(3001, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)


})

app.use(function(req, res, next) 
{
	console.log(req.method, req.url);

	client.lpush('history', req.url);

	client.ltrim('history', 0, 4);
	next(); // Passing the request to the next handler in the stack.
});

app.get('/', function(req, res) {
  res.send('hello world')
})

app.get('/get', function(req, res){

	client.get("newkey", function(err,value){
	 res.send(value);
	});
	//res.send()
});

app.get('/set', function(req, res){

	client.set("newkey", "this message will self-destruct in 10 seconds");

	client.expire("newkey",10);

 	res.send("Key set and expiring")

	console.log("Key set and expiring");
});

app.get('/recent', function(req, res){

	client.lrange('history', 0, -1, function(err, value){
		console.log(value);

		res.send(value);
	})
})


app.post('/upload', multer({ dest: './uploads/'}), function(req, res){
   console.log(req.body) // form fields
   console.log(req.files) // form files

   if( req.files.image )
   {
	   fs.readFile( req.files.image.path, function (err, data) {
	  		if (err) throw err;
	  		var img = new Buffer(data).toString('base64');
	  		client.lpush("image", img);
	  		console.log(img);
		});
	}

   res.status(204).end()
});

app.get('/meow', function(req, res) {
	{
		res.writeHead(200, {'content-type':'text/html'});

		client.lpop("image", function(err, imagedata){

			console.log(imagedata);
   			res.write("<h1>\n<img src='data:my_pic.jpg;base64,"+imagedata+"'/>");

			res.end();
		})
   	
	}
})




