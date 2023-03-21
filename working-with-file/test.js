// const fs = require('fs');
// let data = '';
// const readStream = fs.createReadStream('test.txt', 'utf-8');
// readStream.on('data' , function (chunk) {
//     data += chunk;
// })
// readStream.on('end', () => {
//     console.log(data)
// })

// fs.readFile('2022-11-08 14-49-36.mkv' , 'utf-8', (err, data) => {
//     console.log(data)
// })

// const fs = require('fs');
// const data = 'This is a code to learn" ' +
//     ' " about writing in a stream.';
//
// // Create a writable stream
// const writerStream =
//     fs.createWriteStream('test2.txt');
//
//
// writerStream.write(data, 'utf8', () => {
//     console.log(data)
// });
// writerStream.end();


const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    const stream = fs.createReadStream(`2022-11-08 14-49-36.mkv`);
    let data = ''
    stream.on('data', (chunk) => {
        data += chunk;
    })
    stream.on('end', () => {
        console.log(data)
    })
    stream.pipe(res);

    // fs.readFile('linh.txt', 'utf-8',(err, data) => {
    //     res.write(data);
    //     console.log(data)
    //     res.end()
    // })
});

fs.readFile('linh.txt', 'utf-8',(err, data) => {
    console.log(data)
})

// const stream = fs.createReadStream(`linh.txt`);
// let data = ''
// stream.on('data', (chunk) => {
//     data += chunk;
// })
// stream.on('end', () => {
//     console.log(data)
// })
