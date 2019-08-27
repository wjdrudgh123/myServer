const express = require("express");

const app = express();

app.use(express.static("dist"));

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/dist/html/index.html");
});

app.listen(3000, ()=>{
    console.log("hello");
});