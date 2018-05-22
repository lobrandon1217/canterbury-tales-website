var express = require('express');
var app = express();
var bodyparser = require('body-parser');

// INITIALIZE OBJECT FOR PLANE STUFF
var planeSeats = {};

// INITIALIZE BODY PARSER
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// INITIALIZE THE STATIC PAGES
app.use(express.static("./"));

// POST REQUEST FOR TRAVEL PAGE
app.post("/purchaseTicket", function(req,res){
    // GET INFORMATION FROM REQUEST
    let firstName = req.body.firstName;
    let middleName = req.body.middleName;
    let lastName = req.body.lastName;
    let seat = req.body.seat;

    // CHECK IF SEAT IS TAKEN
    if( planeSeats[seat] != undefined ) {
        res.json({
            'success': false,
            'error': 'This seat is already taken.'
        });
        return;
    } else {
        // SEAT IS NOT TAKEN
        planeSeats[seat] = {
            'firstName': firstName,
            'middleName': middleName,
            'lastName': lastName
        };
        res.json({
            'success': true
        });
        return;
    }

});

// POST REQUEST TO GET TAKEN SEATS
app.post("/getSeats", function(req,res){
    res.json(planeSeats);
    return;
});

// START THE APP AND LISTEN
app.listen(80,function(){
    console.log("Server started");
})