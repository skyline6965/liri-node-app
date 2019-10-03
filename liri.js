

require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var artist = process.argv[2].trim();
var fs = require("fs");
var axios = require("axios");

var spotify = new Spotify(keys.spotify);




var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";






// function spotifyThisSong();
// function movieThis();
// function doWhatItSays();



function searchApi(queryURL){
    switch (queryURL) {
        case 'concert-this':
            axios.get('https://rest.bandsintown.com/artists/' + artist.slice(3).join("%"))
                .then(function (response) {
                    var concertData = response.data[0].venue.name;
                    console.log(concertData);
                })
            break;
    };
};

searchApi(process.argv[2]);