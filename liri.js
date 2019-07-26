// Code to read and set any environment variables with dotenv packages
require('dotenv').config();

var request = require("request");
var moment = require("moment");
var fs = require("fs");
var axios = require("axios")

// code required to import keys.js
var keys = require('./keys.js');

//defines Spotify
var Spotify = require("node-spotify-api");

// access key information
var spotify = new Spotify(keys.spotify);

// commands taken in by Liri from the command line/terminal
var command = process.argv[2];
// data to search for
var dataToFind = process.argv.splice(3).join(' ');

switch (command) {
    case 'concert-this':
        concertThis(dataToFind);
        break;
    case 'spotify-this-song':
        spotifySong(dataToFind);
        break;
    case 'movie-this':
        movieThis(dataToFind);
        break;
    case 'do-what-it-says':
        doIt(dataToFind);
        break;
    default:
        break;
}

// Concert this
function concertThis(dataToFind) {
    axios.get(`https://rest.bandsintown.com/artists/${dataToFind}/events?app_id=codingbootcamp`)
        .then(function (response) {
            const concerts = response.data;

            // console.log(concerts);

            for (i = 0; i < concerts.length; i++) {
                console.log(`
           Venue Name: ${concerts[i].venue.name}
           Venue Location: ${concerts[i].venue.country}
           Date: ${moment(concerts[i].datetime).format('L')}`);
            };
        }).catch(function (err) {
            console.log(err);
        })
    // console.log(dataToFind)
};


// Movie this 
function movieThis(dataToFind) {
    console.log(dataToFind);
    // default movie to search if blank command line 
    if (dataToFind === '') {
        dataToFind = "Mr. Nobody"
    };

    // call to OMDB API,
    axios.get(`http://www.omdbapi.com/?t=${dataToFind}&y=&plot=short&apikey=trilogy`)
        .then(function (response) {
            const result = response.data;
            // console.log(result);
            console.log(`
            _________Movie-This__________
            `)
            console.log(`
                Title: ${result.Title}
                ~Year: ${result.Year}
                ~IMDB Rating: ${result.imdbRating}`);
            if (result.Ratings.length > 1) {
                console.log(`                ~Rotten Tomatoes Score: ${result.Ratings[1].Value}`)
            } else {
                console.log(`No Rotten Tomatoes Score`);
            }
            console.log(`                ~Country:  ${result.Country}
                ~Language: ${result.Language}
                ~Actors:  ${result.Actors}

                ~Plot: ${result.Plot}
                `);
        }).catch(function (err) {
            console.log(err);
        })
    };

// Spotify-this-song

function spotifySong(dataToFind){
    spotify.search({ type: 'track', query: dataToFind, limit:1 })
  .then(function(response) {
    let song = response;

    console.log(`
           ~~~~~~ Your Jam ~~~~~~
        Artist: ${song.tracks.items[0].artists[0].name}
        Song:   ${song.tracks.items[0].name}
        Album: ${song.tracks.items[0].album.name}
        Pre URL: ${song.tracks.items[0].external_urls.spotify}
        `);
  })
  .catch(function(err) {
    console.log(err);
  });
}
