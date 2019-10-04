

require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


var fs = require("fs");
var axios = require("axios");
var moment = require("moment");

var command = process.argv[2];
var userInput = process.argv.slice(3).join("+");

if (!userInput) {
    userInput = "The+Sign";
}

var bandURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
var movieURL = "http://www.omdbapi.com/?t=" + userInput + "&apikey=5f78b13";


function searchApi() {
    switch (command) {
        // ----------------------------------Concert This------------------------------------------------
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
        // ----------------------------------Spotify this song -------------------------------------------------
        case 'spotify-this-song':
            spotify.search({ type: 'track', query: userInput, limit: 1 }).then(function (response) {
                // debugger;
                // console.log(JSON.stringify(response, null, 2));
                var songObject = response.tracks.items;
                for (var i = 0; i < songObject.length; i++) {
                    console.log("-----------------------------");
                    console.log("Artist: " + songObject[i].artists[i].name);
                    console.log("Song name: " + songObject[i].name);
                    console.log("Song Link: " + songObject[i].href);
                    console.log("Album Name: " + songObject[i].album.name);
                    console.log("-----------------------------");
                };
            }).catch(function (err) {
                console.log(err);
            });

            break;

        // ------------------------------------movie-this--------------------------------------------------------

        case 'movie-this':
            axios.get(movieURL).then(function (response) {
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("Rated: " + response.data.Rated);
                console.log("Released: " + response.data.Released);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                // console.log(movieURL);
            }).catch(function (err) {
                console.log(err);
            });

            break;
        // --------------------------------------do-what-it-says-----------------------------------------------------
        case 'do-what-it-says':
            fs.readFile('random.txt', 'utf-8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                var output = data.split(",");
                for (var i = 0; i < output.length; i++) {
                    console.log(output[i]);

                }
                // console.log(data);
            });

            break;

        default:
            console.log('-------------------------------------------------------')
            console.log('Hello!');
            console.log(' ');
            console.log(' Please choose from one of the following commands:');
            console.log(' ');
            console.log(' > concert-this' + ' (i.e: concert-this Blink-182)');
            console.log(' > spotify-this-song' + ' (i.e: spotify-this-song Welcome Home)');
            console.log(' > movie-this' + ' (i.e: movie-this Blade Runner)');
            console.log(' > do-what-it-says' + ' (i.e: dont do this one)');
            break;
    };
};

searchApi();