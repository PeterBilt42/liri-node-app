var keys = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var fs = require('fs');
  
	var getMyTweets = function(){
		
		var client = new Twitter(keys.twitterKeys);

		var params = {screen_name: 'John Cina'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
			if (!error) {
			   	for (var i = 0; i < tweets.length; i++) {
			   		console.log(tweets[i].created_at);
			   		console.log(' ');
			   		console.log(tweets[i].text);
		   		}
			}
		});
	}

	var getArtistName = function(artist) {
		return artist.name;
	}

var getMySpotify = function(songName) {
	
	var songName = process.argv[3];

	var spotify = new Spotify({id: '08798a5a78d64c4aad19751f5321e489',
  secret: '6aa10c6dce584a60b5d78423c0f384bb'});

	spotify.search({ type: 'track', query: songName }, function(err, data) {
	  	if (err) {
	    	console.log('Error occurred: ' + err);
	    	return;
	  	}
		var songs = data.tracks.items[0];
			console.log('artist(s): ' + songs.artists[0].name);
			console.log('song name: ' + songs.name);
			console.log('preview song: ' + songs.preview_url);				
			console.log('album: ' + songs.album.name);
			console.log('-------------------------------------------');		
	});
}

var getMovieFunction = function(movieName) {
	
	var movieName = process.argv[3];

	request('http://www.omdbapi.com/?apikey=40e9cece&t=' + movieName + '&y=&plot=short&r=json',function(error, response, body){
		if (!error && response.statusCode == 200) {
			console.log('Title: ' + JSON.parse(body).Title);
			console.log('Year: ' + JSON.parse(body).Year);
			console.log('Rated: ' + JSON.parse(body).Rated);
			console.log('IMDB Ratings: ' + JSON.parse(body).imdbRating);
			console.log('Country: ' + JSON.parse(body).Country);
			console.log('Plot: ' + JSON.parse(body).Plot);
			console.log('Language: ' + JSON.parse(body).Language);
			console.log('Country: ' + JSON.parse(body).Country);
			console.log('Actors: ' + JSON.parse(body).Actors);
			console.log('Rotten Tomatoes: ' + JSON.parse(body).Ratings[1].Value);
		}
	});
}
var doWhatItSays = function(caseData, functionData) {
	fs.readFile('random.txt','utf8', function(err, data) {
		// if (err) throw err;
		
		var dataArr = data.split(',');

		if (dataArr.length == 2) {
			pick(dataArr[0], dataArr[1]);
		}
		else if (dataArr.length == 1){
			pick(dataArr[0]);
		}
	
	});
}
var pick = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets' :
			getMyTweets();
			break; 
		case 'spotify-this-song' :
			getMySpotify();
			break; 
		case 'movie-this' :
			getMovieFunction();
		case 'do-what-it-says' :
			doWhatItSays();
			break;
		default:
		console.log("Liri doesn't know how to do that");
	}
}

var runThis = function(argOne, argTwo) {
	pick(argOne,argTwo);
};

runThis(process.argv[2], process.argv[3]);