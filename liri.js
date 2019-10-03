

require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);


var userInput = process.argv.slice(3).join("%");
var bandURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";


function searchApi(query) {
    switch(query){
        case 'concert-this':            
            axios.get(bandURL)
                .then(function (response) {
                    console.log(bandURL);
                })
            break;
        case 'spotify-this-song':
            axios.get('https://api.spotify.com/v1/search/q=' + userInput +  )

            break;
        default:
            console.log('test')
            
            break;
    };
};

searchApi(process.argv[2]);