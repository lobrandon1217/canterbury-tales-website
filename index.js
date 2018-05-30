// imports 
var express = require('express');
var bodyparser = require('body-parser');

// initialize express
app = express();

// use static pages for the js and css and html website
app.use( express.static( "./node_modules/jquery/dist/" ) );
app.use( express.static( "./node_modules/popper.js/dist/" ) );

// use json
app.use( bodyparser.urlencoded({ extended: true }) );
app.use( bodyparser.json() );

// placeholder for plane seats
var planeSeats = {};

// www for html files
app.use( express.static( "./www/", { extensions: ['html', 'css'] } ) );

// post requests
// simple get taken seats
app.post("/post/get_taken_seats", function(req,res,next){
    res.json(planeSeats);
});

// book a seat
app.post( "/post/book_seat", function( req,res ) {
    // we first get the data
    let formData = req.body;
    // first we check for values
    if( formData.firstName.indexOf(" ") === 0 || formData.lastName.indexOf(" ") === 0 ) {
        //check for space
        res.json({
            success: false,
            error: "Names cannot begin with a space."
        });
        return;
    } else if( formData.seat.length < 2 ) {
        //check for seat
        res.json({
            success: false,
            error: "You must select a seat."
        });
        return;
    }
    // check if the requested seat is in there
    if( formData.seat in planeSeats ) {
        res.json({
            'success': false,
            'error': 'This seat is already taken.'
        });
        return;
    } else {
        planeSeats[ formData.seat ] = `${formData.firstName} ${formData.middleName} ${formData.lastName}`;
        res.json({
            success: true
        });
        return;
    }
} );

// listen
app.listen(80, function(){
    console.log("Server is running.");
});