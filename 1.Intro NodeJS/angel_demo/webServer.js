const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'content-type': 'text/html',
  });
  switch (req.url) {
    case '/':
      res.write('<h1>Hello from the server</h1>');
      break;
    case '/cats':
      res.write('Some cats here');
    default:
      res.write('Anything else');
      break;
  }
  res.end();
});

server.listen(5000);

console.log('Server is running on port 5000...');
