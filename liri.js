

require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


var fs = require("fs");
var axios = require("axios");
var moment = require("moment");

var command = process.argv[2];
var userInput = process.argv.slice(3).join("+");
if(!userInput){
    userInput = "The+Sign";
}
var bandURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";


function searchApi() {
    switch (command) {
        case 'concert-this':
            axios.get(bandURL).then(function (response) {
                console.log(bandURL);
                console.log(response.data[0].venue.name);
                console.log(response.data[0].venue.city);
                console.log(moment(response.data[0].datetime).format('MM/DD/YYYY'));

            })
                .catch(function (err) {

                    console.log(err);
                });
            break;

        case 'spotify-this-song':
            spotify.search({ type: 'track', query: userInput, limit: 1 }).then(function (response) {
                // debugger;
                console.log(JSON.stringify(response, null, 2));

                var songObject = response.tracks.items;
                for (var i = 0; i < songObject.length; i++) {
                    console.log("-----------------------------")
                    console.log("Artist: " + songObject[i].artists[i].name);
                    console.log("Song name: " + songObject[i].name);
                    console.log("Song Link: " + songObject[i].href);
                    console.log("Song Link: " + songObject[i].album.name);
                    console.log("-----------------------------")
                };
            }).catch(function (err) {
                console.log(err);
            });
            break;

          



        default:
            console.log('test')

            break;
    };
};

searchApi();