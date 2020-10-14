// server part
const fs = require('fs');
const http = require ('http'); 
const debug = require('debug')('http')

const server = http.createServer((req, res) => {
    debug('requested', req.url);

    const path = `./public${req.url === '/' ? '/index.html' : req.url}`;

    // to outside interference checking
    const ip = res.socket.remoteAddress;
    const port = res.socket.remotePort;
    // console.log -> debug
    debug(`Your IP address is ${ip} and your source port is ${port}.`);

    file = fs.readFile(path, (err, file) =>{
        if (err){
            debug('file read error', path, err);
            res.write('error');
            res.end();
            return; 
        }
        debug('file read', path);
        
        res.write(file);
        res.end();
    });   
    
    debug('after read file')
});

server.listen(3001);