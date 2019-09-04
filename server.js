const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const formidable = require("formidable");
const PdfReader = require("pdfreader").PdfReader;

const app = express();

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

app.use(express.static("dist"));
app.use(express.static("materials"));

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/dist/html/index.html");
});

app.post("/getFolderList", (req, res)=>{
    let path = "";
    let temp = req.body.path.split("/");
    /* 
        ..을 누르면 폴더 경로에서 마지막을 빼고 마지막 앞이랑 비교해서 같거나 최상위 올라가면 ""이 오므로
        이를 사용해서 경로를 새로 만들어 줌
    */
    if(req.body.path === ""){
        path = "/"+req.body.folder;
    }else if(req.body.folder === "/"+temp[temp.length - 2] || req.body.folder === ""){
        for(let i = 0; i < temp.length-1; i++){
            path += "/"+temp[i]
        }
    }else{
        if(temp[temp.length-1] === req.body.folder){
            path = "/"+req.body.path;
        }else{
            path = "/"+req.body.path+"/"+req.body.folder;
        }
    }
    fs.readdir(__dirname+"/materials"+path, (err, file)=>{
        if(err) throw err;
        let sentValue ={
            "no":0,
            "file":file
        };
        if(req.body.folder !== ""){
            sentValue.no = 1;
        }
        res.send(sentValue);
        res.end();
    });
});
app.post("/makeFolder", (req, res) => {
    fs.mkdir(__dirname+"/materials"+req.body.path+"/"+req.body.foldername, {recursive : true}, (err) => {
        if(err) throw err;
        else{
            res.send("success");  
            res.end();
        } 
    });
});

app.post("/uploadFile", (req, res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, field, files){
        var newPath = "./materials";
        var oldPath = files.uploadFile.path;
        if(field !== ""){
            newPath += field.filePath;
        }
        fs.rename(oldPath, newPath+"/"+files.uploadFile.name, function(err){
            if (err) throw err;
            res.write("success");
            res.end();
        });
    });
});



app.post("/getFileContext", (req, res)=>{
    let path = __dirname+"/materials"+req.body.filePath+"/"+req.body.fileName;
    if(req.body.fileName.match(/.png/ig) !== null || req.body.fileName.match(/.jpeg/ig) !== null || req.body.fileName.match(/.jpg/ig) !== null){
        fs.readFile(path, (err, data)=>{
            res.writeHead(200, {
                "Content-Type":"image/"+req.body.fileName.split(".")[req.body.fileName.split(".").length-1]
            });
            res.write(data);
            res.end();
        });
    }else if(req.body.fileName.match(/.pdf/gi) !== null){
        var raw = {};
        var data = [];
        fs.readFile(path, (err, pdfBuffer) => {
            new PdfReader().parseBuffer(pdfBuffer, function(err, item) {
                if (err) callback(err);
                else if (!item || item.page){
                    Object.keys(raw).sort((y1, y2)=>parseFloat(y1) - parseFloat(y2)).forEach(y => {
                        data.push((raw[y] || []).join(""));
                    });
                    raw = {};
                    if(data.length !== 0){
                        res.setHeader("Content-Type","application/pdf")
                        res.send(JSON.stringify({
                            "filecontent":data,
                            "filename":req.body.fileName
                        }));
                        res.end();
                    }
                }
                else if (item.text) {
                    (raw[item.y] = raw[item.y] || []).push(item.text);
                }
            });
        });
    }
    else{
        fs.readFile(path, "utf8",(err, data)=>{
            res.send(JSON.stringify({
            "filename":req.body.fileName,
            "filecontent":data
            }));     
            res.end();
        });
    }
});

app.post("/delete", (req, res)=>{
    let path = __dirname+"/materials"+req.body.value.path;
    if(req.body.value.files.length !== 0){
        for(let i = 0; i < req.body.value.files.length; i++){
            fs.unlink(path+"/"+req.body.value.files[i], (err)=>{
                if(err) throw err;
                res.send("success");
            })

        }
    }else if(req.body.value.folders.length !== 0){
        for(let i = 0; i < req.body.value.folders.length; i++){
            fs.rmdir(path+"/"+req.body.value.folders[i], (err)=>{
                if(err){
                    res.send(err.code);
                }else{
                    res.send("success");
                }
            })

        }
    }

});

app.listen(process.env.PORT || 3000);