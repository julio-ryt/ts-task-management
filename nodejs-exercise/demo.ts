import { readFile, existsSync } from 'fs';
import { createServer as createHttpServer } from 'http';

createHttpServer((req, res) => {
  const filePath = 'nodejs-exercise/demo.html';
  console.log(`Checking if ${filePath} exists: ${existsSync(filePath)}`);

  readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('404 Not Found');
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
  });
}).listen(8080);

console.log('Server listening on port 8080');
