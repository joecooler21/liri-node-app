require("dotenv").config();
var keys = require("./keys.js");

var axios = require("axios");
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

const fs = require('fs');
var moment = require('moment');

var argList = process.argv;
argList.shift();
argList.shift();

switch (argList[0]) {
    case 'concert-this':
        bandsQuery();
        break;
    case 'spotify-this-song':
        spotifyQuery();
        break;
    case 'movie-this':
        movieQuery();
        break;
    case 'do-what-it-says':
        randomQuery();
        break;
    default:
        console.log('Error: command not recognized\nUsage: concert-this: [artist name] | spotify-this-song [song title] | movie-this [movie title] | do-what-it-says');
        break;
}

function bandsQuery(arg) {
    if (!arg) {
        argList.shift();
        arg = catArg(argList);
    } 
    if (!arg) {
        arg = 'Metallica'
    }
    axios
        .get(`https://rest.bandsintown.com/artists/${arg}/events?app_id=${process.env.BIT_KEY}`)
        .then(response => {
            response.data.forEach(e => {

                let concert = [];

                concert.push(e.venue.name);
                concert.push(e.venue.location);
                concert.push(moment(e.datetime).format('l'));
                concert.forEach(e => {
                    if (!e) {
                        e = 'N/A';
                    }
                });

                console.log(`Venue Name: ${concert[0]}\nVenue Location: ${concert[1]}\nDate: ${concert[2]}\n`);
            });
        });
}

function spotifyQuery(arg) {
    if (!arg) {
        argList.shift();
        arg = catArg(argList);
    } 
    if (!arg) {
        arg = 'Panama'
    }

    spotify.search({ type: 'track', query: arg }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        let trackInfo = data.tracks.items[0];
        if (!trackInfo) {
            console.log('No results found. Please refine your search.');
            return;
        }

        let song = [];
        song.push(trackInfo.name);
        song.push(trackInfo.album.artists[0].name);
        song.push(trackInfo.album.name);
        song.push(trackInfo.preview_url);
        song.forEach(e => {
            if (!e) {
                e = 'N/A';
            }
        });
        console.log(`Title: ${song[0]}\nArtist: ${song[1]}\nAlbum: ${song[2]}\nPreview: ${song[3]}`);
    });
    return;
}

function movieQuery(arg) {
    if (!arg) {
        argList.shift();
        arg = catArg(argList);
    } 
    if (!arg) {
        arg = 'Goodfellas'
    }

    axios
        .get(`https://www.omdbapi.com/?t=${arg}&y=&plot=short&apikey=trilogy`)
        .then(response => {
            let info = response.data;
            let movie = [];
            movie.push(info.Title);
            movie.push(info.Year);
            movie.push(info.imdbRating);
            movie.push(info.Country);
            movie.push(info.Language);
            movie.push(info.Plot);
            movie.push(info.Actors);

            let NA = 0;

            movie.forEach(e => {
                if (e === undefined) {
                    NA++;
                }
            });

            if (NA === 7) {
                console.log('No results found. Please refine your search');
                return;
            }

            console.log(`\nTitle: ${movie[0]}\nYear: ${movie[1]}\nIMDB Rating: ${movie[2]}\nCountry: ${movie[3]}\nLanguage: ${movie[4]}\n\nPlot: ${movie[5]}\n\nActors: ${movie[6]}`);


        });
    return;
}

function randomQuery() {
    fs.readFile('./random.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        let str = data.split('\r\n');
        let rand = Math.floor(Math.random() * str.length);
        str = str[rand].split(', ');

        console.log(str[0]);
        let arg = catArg(str[1].split(' '));

        switch (str[0]) {
            case 'spotify-this-song':
                spotifyQuery(arg);
                break;
            case 'concert-this':
                bandsQuery(arg);
                break;
            case 'movie-this':
                movieQuery(arg);
                break;
            default:
                break;
        }
    })
}
function catArg(args) {
    var result = "";

    for (i = 0; i < args.length; i++) {
        if (i === args.length - 1) {
            result += args[i];
        } else {
            result += args[i] + "+";
        }
    }

    return (result);
}