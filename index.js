const fs = require('fs');
const http = require('http');
const url = require('url');

///////////////////////////////////////////////
//// Server ///////////////////////////////////
///////////////////////////////////////////////

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.price);
    output = output.replace(/{%NUTRIETS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
};

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    // overview
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        const cardsHTML = dataObj.map(e => replaceTemplate(tempCard, e));
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);

        res.end(output);
    }
    // product
    else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        // const product = dataObj[query.id];
        // const output = replaceTemplate(tempProduct, product);

        // res.end(output);

        res.end(replaceTemplate(tempProduct, dataObj[query.id]));
    }
    // api
    else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end(data);

        // not found
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
