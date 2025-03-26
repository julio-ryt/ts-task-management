"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var http_1 = require("http");
(0, http_1.createServer)(function (req, res) {
    var filePath = 'nodejs-exercise/demo.html';
    console.log("Checking if ".concat(filePath, " exists: ").concat((0, fs_1.existsSync)(filePath)));
    (0, fs_1.readFile)(filePath, function (err, data) {
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
