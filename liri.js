require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var command = process.argv[2];
var value = process.argv[3];


function commandSwitch() {
    switch (command) {
        case "concert-this":
            findConcerts();
            break;
        case "spotify-this-song":
            findSongs();
            break;
        case "movie-this":
            findMovie();
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
    }
}

function findSongs() {
    console.log('findSong executeed')

 // CHeck if value exist
 // if not update value 
    if (!value) {
        value = "The sign Ace of Base";
    }

    spotify.search({
        type: 'track',
        query: value
    }, function (err, data) {
        if (err) {
            return console.log('Error: ' + err);
        }

        var song = data.tracks.items[0];
        var artist = song.artists[0].name;
        var songName = song.name;
        var preview = song.preview_url;
        if (preview === null) {
            preview = "not available";
        }
        var album = song.album.name;
        console.log("________________________________");
        console.log("Artisit: " + artist);
        console.log("Song Name: " + songName);
        console.log("A preview link: " + preview);
        console.log("Album" + album);
        console.log("________________________________");
    });


}

function findConcerts() {
    
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log("Name of the venue: " + response.data[0].venue.name);
            console.log("Venue Location: " + response.data[0].venue.city + "," + response.data[0].venue.region);
            console.log("Date: " + response.data[0].datetime).format("MM/DD/YYYY");
            console.log("Name of the venue: " + response.data[0].venue.name);
        })

        .catch(function (err) {
            console.log(err);
        });
}

function findMovie() {
  
    if (!value ) {
    value = "Mr. Nobody"
    }

    axios.get("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("________________________________");
            console.log("Title of the Movie: " + response.data.Title);
            console.log("Year of the movie came out: " + response.data.year);
            console.log("IMDB Rating of the Movie: " + response.data.rating);
            console.log("Rotten Tomatoes Rating of the movie: " + response.data.RTrating);
            console.log("Country where the movie was produced: " + response.data.country);
            console.log("Language of the movie: " + response.data.language);
            console.log("Plot of the movie: " + response.data.plot);
            console.log("Actors in the movie: " + response.data.actors);
            console.log("________________________________");
        })
        .catch(function (err) {
            console.log(err);
        });

}

function doWhatItSays() {
// read random.txt file
//
    console.log('doWhatItSays executed:')
    fs.readFile('random.txt', "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(",");
        console.log('dataArr', dataArr)
                // Execute the first data that gets back from dataArr

        command  = dataArr[0] 
        value = dataArr[1]
        commandSwitch()

    });
}


commandSwitch();