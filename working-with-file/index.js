const fs = require('fs');
// fs.readFile('data/test.txt', 'utf-8',(err, data) => {
//     console.log(data)
// })

// let data = fs.readFileSync('data/test.txt', 'utf-8')
// console.log(data);
// console.log(1);

// const http = require('http');
// let server = http.createServer((req, res) => {
//     fs.readFile('views/index.html', 'utf-8', (err, data) => {
//         res.write(data);
//         res.end();
//     })
// })
// server.listen(3000, () => {
//     console.log('server is running')
// })

// fs.writeFileSync('test2.txt', 'Hi' , (err) => {
//     // console.log(err)
// })
// console.log(fs.readFileSync('test2.txt', 'utf-8'))

// fs.writeFile('test2.txt', 'C09' , {flag: 'a'},(err) => {
//     // console.log(err)
// })

let data = fs.readFileSync('test2.txt', 'utf-8');
data+= 'hello'
fs.writeFileSync('test2.txt', data);