const http = require('http');
const formidable = require('formidable');
const fs = require("fs");

const viewFormUpload = fs.readFileSync('viewUploadForm.html')
http.createServer(function (req, res) {
    if (req.url === '/upload' && req.method === 'POST') {
        let form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if (err) {
                console.log(err)
            }
            console.log(files)
            let tmpPath = files.img.filepath;
            let newPath = __dirname + "/upload/" + files.img.originalFilename;
            fs.readFile(newPath, (err) => {
                if (err) {
                    fs.copyFile(tmpPath, newPath, (err) => {
                        if (err) throw err;
                    });
                }
            })
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        return res.end(viewFormUpload);
    }
}).listen(3000);