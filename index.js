var express = require('express');
var app = express();

// INITIALIZE THE STATIC PAGES
app.use(express.static("./"));

// START THE APP AND LISTEN
app.listen(80,function(){
    console.log("Server started");
})