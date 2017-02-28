/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var messages = {'results': []};

var exports = module.exports = {};

exports.requestHandler = function(request, response) {
  
  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10, // Seconds.
    'Content-Type' : 'application/json'
  };

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  var statusCode = 200;
  console.log('line 31', request.method, request.url.substring(0, 17));
  if (request.method === 'OPTIONS' && (request.url === '/classes/messages' || request.url === '/classes/messages?order=-createdAt&limit=1000')) {
    response.writeHead(statusCode, headers);
    response.end();
  } else if (request.method === 'GET' && (request.url === '/classes/messages' || request.url === '/classes/messages?order=-createdAt&limit=1000' || request.url === '/classes/room')) {
    console.log(JSON.stringify(messages));
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(messages));
  } else if (request.method === 'GET') {
    response.statusCode = 404;
    response.end();
  } else {


  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
    // console.log('Serving request type ' + request.method + ' for url ' + request.url);


    // The outgoing status.


    // Tell the client we are sending them plain text.
    //
    // You will need to change this if you are sending something
    // other than plain text, like JSON or HTML.

    var body = [];

    if (request.method === 'POST' && (request.url === '/classes/messages' || request.url === '/classes/room')) {
      // request.on('error', function(err) {
      //   response.writeHead(404, headers);
      // });
      console.log(request.url);
      request.on('data', function (info) {
        // console.log(info);
        body.push(info);
      });
      request.on('end', function () {
        // console.log(messages);
        // messages.results = Buffer.concat(messages.results).toString();
        //body = Buffer.concat(body).toString();
        messages.results.push(body.concat().toString());
      });
      response.writeHead(201, headers);
      response.end('post received');
    } else {
      response.writeHead(statusCode, headers);
      response.end(JSON.parse(messages));
    }

  }
  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
 // response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  //response.end(JSON.stringify(messages));
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
// var defaultCorsHeaders = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10 // Seconds.
// };

