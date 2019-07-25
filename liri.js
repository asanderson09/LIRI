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

function concertThis(dataToFind){
    axios.get(`https://rest.bandsintown.com/artists/${dataToFind}/events?app_id=codingbootcamp`)
    .then(function(response){
        const concerts = response.data;

       // console.log(concerts);

        for(i=0; i<concerts.length; i++){
            console.log(`
           Venue Name: ${concerts[i].venue.name}
           Venue Location: ${concerts[i].venue.country}
           Date: ${concerts[i].date}`);
        };
    }).catch(function(err){
        console.log(err);
    })
   // console.log(dataToFind)
};














// function spotifySong(dataToFind){ spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }
   
//   console.log(data); 
//   })
// };
