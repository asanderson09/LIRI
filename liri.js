// Code to read and set any environment variables with dotenv packages
require('dotenv').config();

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
var dataToFind = process.argv.splice(3).join();

switch (command) {
    case 'concert-this':
        concertThis(command);
        break;
    case 'spotify-this-song':
        spotifySong(command);
        break;
    case 'movie-this':
        movieThis(command);
        break;
    case 'do-what-it-says':
        doIt(command);
        break;        
    default:
        break;
}


function spotifySong(){ spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  })
};
console.log(dataToFind,);