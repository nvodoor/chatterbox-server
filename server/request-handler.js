var messages = [
  // {
  //   text: 'Hello World',
  //   username: 'Bob'
  // }
];

var objectIdCounter = 1;
var exports = module.exports = {};

exports.requestHandler = function(request, response) {
  
  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10, // Seconds.
    'Content-Type': 'application/json'
  };
  
  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  var statusCode = 200;
  if (request.method === 'OPTIONS' && request.url === '/classes/messages') {
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(null));
  } else if (request.method === 'GET' && (request.url === '/classes/messages' || request.url === '/classes/messages?order=-createdAt&limit=1000')) {
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify({results: messages}));
  } else if (request.method === 'POST' && (request.url === '/classes/messages' || request.url === '/classes/messages?order=-createdAt&limit=1000')) {
    var data = '';
    request.on('data', function(chunk) {
      data += chunk;
    });
    request.on('end', function() {
      var parseData = JSON.parse(data);
      parseData.objectId = ++objectIdCounter;
      messages.push(parseData);
      statusCode = 201;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify({objectId: parseData.objectId}));
    });
  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(''));
  }
};

