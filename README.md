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
![](assets/img/concert.png)
node liri movie-this [movie title]
![](assets/img/movie.png)
node liri spotify-this-song [song title]
![](assets/img/song.png)
node liri do-what-it-says [no parameter required; pulls a random command from random.txt]
![](assets/img/random.png)
