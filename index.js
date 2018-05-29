// imports 
var express = require('express');
var bodyparser = require('body-parser');

// initialize express
app = express();

// use static pages for the js and css and html website
app.use( express.static( "./node_modules/jquery/dist/" ) );
app.use( express.static( "./node_modules/popper.js/dist/" ) );

// www for html files
app.use( express.static( "./www/", { extensions: ['html', 'css'] } ) );

// listen
app.listen(80, function(){
    console.log("Server is running.");
});