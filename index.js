const fs = require('fs');
const http = require('http');
const url = require('url');

/*
// Blocking, synchonous way
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

// console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\n Created on ${Date.now()}`;

fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');
*/

/*
// Non-blocking, async
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if (err) return console.log('ERROgt
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
                console.log('1: ', 'Your file has been written!');
            });
        });
    });
});

fs.readFile('./txt/final.txt', 'utf-8', (err, data) => {
    console.log('2: ', data);
});
*/

///////////////////////////////////////////////
//// Server ///////////////////////////////////
///////////////////////////////////////////////

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') res.end('This is the overview');
    else if (pathName === '/product') res.end('This is the product');
    else if (pathName === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world',
        });
        res.end('<h1>This page could not be found!</h1>');
    }
});

server.listen(8080, '127.0.0.1', () => {
    console.log('listening to requests on port 8080!');
});
