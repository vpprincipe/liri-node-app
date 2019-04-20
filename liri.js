var axios = require("axios");
var Spotify = require("node-spotify-api");

require("dotenv").config();

// var fs = require('fs');
var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var argument = process.argv[3];

switch (command){
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
}

function concertThis() {
    console.log("concertthis is running")
    axios
        .get("https://rest.bandsintown.com/artists/" + argument + "/events?app_id=codingbootcamp")
        .then(function(response) {
            for(var i = 0; i < response.data.length; i++){
                console.log(response.data[i].venue.name);
                console.log(response.data[i].venue.city + ", " + response.data[i].venue.region);
                console.log(response.data[i].datetime);

            }
        })
}

function spotifyThisSong() {
    console.log("spotify this is running")
    spotify.search({ type: 'track', query: argument }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
     data.tracks.items.forEach(function(item) {
        //  console.log(item);
     }); 
     console.log(Object.keys(data.tracks.items[0]))
      });

}
