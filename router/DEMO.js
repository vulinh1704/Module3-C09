const http = require('http');
let url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const server = http.createServer((req, res) => {
    let decoder = new StringDecoder('utf-8');
    let data = '';
    req.on('data' , chunk => {
        console.log(chunk);
        data += decoder.write(chunk);
        console.log(data);
    });
});
server.listen(3000, () => {
    console.log('Server is running')
})