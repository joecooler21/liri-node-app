# LIRI

LIRI is a command line application written in Node.js that allows you to quicky look up movie, song and concert information.

## Installation

LIRI uses multiple modules and APIs

```bash
npm i node-spotify-api
npm i dotenv
npm i moment
npm i axios
```

## Usage

```
node liri concert-this [band name]
node liri movie-this [movie title]
node liri spotify-this-song [song title]
node liri do-what-it-says [no parameter required; pulls a random command from random.txt]