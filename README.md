Homework 3
=========================

This repo was created for option two.  

## Prerequisites

 Redis should be installed on your machine globally:  

 - If you are using [Homebrew](http://brew.sh/) in OSX this is as easy as:

  `brew install redis`

 - In Ubuntu linux:

  `sudo apt-get install redis-server`

## Usage

Clone the repo and cd into it's directory and then run;

`npm install`

Then in another window run:

  `redis-server`

This brings up redis on port 6379.

In the first window run, the sudo command is necessary at least in OSX to open up port 80:

`sudo node proxy.js`

This brings up the proxy server on port 80.

In another console window run:

`node server.js`

This brings up the first service instance on port 3000.

Finally in a fourth console window run:

`node server2.js`

This brings up the second service instance.

At this point running the service showing all console windows looks as shown below.

![ServiceRunning](https://github.com/Wildtrack/HW3/blob/master/img/ServiceRunning.png)

## Function 

The service can be accessed by going to [http://localhost](http://localhost).  Going to this site has the proxy server pipe whatever request it is to one of the service instances.  Traffic alternates between each service.  All of the same original functionality from the earlier workshop is intact.  

If the cat photo from the workshop is in redis currently remove it before running the demo below.  To remove the photo do the following: 

`redis-cli`

This brings up the redis command line interface, then run:

`del image`

After the image is removed run:

curl -F "image=@./img/morning.jpg" localhost/upload

This reuploads the cat photo, but as you can see in the image below the proxy server deals with sending commands to each service instance in an alternating fashion.  Additionally all of the original set and get functions work.  

Image of curl command:
![curl command](https://github.com/Wildtrack/HW3/blob/master/img/CurlCommand.png)

Going to [http://localhost/meow](http://localhost/meow) brings up the screenshot below:
![cat image](https://github.com/Wildtrack/HW3/blob/master/img/CatImage.png)

Going to [http://localhost/recent](http://localhost/recent) brings up the screenshot below:
![localhost recent](https://github.com/Wildtrack/HW3/blob/master/img/LocalHostRecent.png)

Going to [http://localhost/set](http://localhost/set) brings up the screenshot below
![set](https://github.com/Wildtrack/HW3/blob/master/img/set.png)

And then very quickly going to Going to [http://localhost/get](http://localhost/get) brings up the screenshot below
![get](https://github.com/Wildtrack/HW3/blob/master/img/get.png)

An image below shows the output of the services after all commands have been run.
![fin](https://github.com/Wildtrack/HW3/blob/master/img/fin.png)


## Evaluation for Option 2
- Get/Set is complete as shown above
- Recent is complete as shown above
- Upload/meow is complete as shown above
- The additional service instance is server2.js
- The proxy is proxy.js



