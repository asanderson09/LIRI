// Code to read and set any environment variables with dotenv packages
require('dotenv').config();

var axios = require("axios")
// code required to import keys.js
var Spotify = require("node-spotify-api"); 

var keys = require('./keys.js');

//defines Spotify

// access key information
var spotify = new Spotify(keys.spotify);

function spotifySong(){ spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  })
};