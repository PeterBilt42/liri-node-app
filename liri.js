var keys = require('./keys.js');

var Twitter = require('twitter');

var spotify = require('node-spotify-api');

var request = require('request');

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
	spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
	  	if (err) {
	    	console.log('Error occurred: ' + err);
	    	return;
	  	}
		var songs = data.tracks.items;
		for (var i = 0; i < songs.length; i++) {
			console.log(i)
			console.log('artist(s): ' + songs[i].artist.map(getArtistName));
			console.log('song name: ' + songs[i].name);
			console.log('preview song: ' + songs[i].preview_url);				
			console.log('album: ' + songs[i].album.name);
			console.log('-------------------------------------------');
		}		
	});
}

var getMoieFunction = function(movieName) {
	request('http://http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json',function(error, response, body){
		if (!error && response.statusCode == 200) {
			console.log('Title: ' + jsonData.Title);
			console.log('Year: ' + jsonData.Year);
			console.log('Rated: ' + jsonData.Rated);
			console.log('IMDB Ratings: ' + jsonData.imdbRating);
			console.log('Country: ' + jsonData.Country);
			console.log('Plot: ' + jsonData.Plot);
		}
	});
}
var doWhatItSays = function(caseData, functionData) {
	fs.readFile('random.txt','utf8', function(err, data) {
		if (err) throw err;
		
		var dataArr.length = data.split(',');

		if (dataArr.length == 2) {
			pick(dataArr[0], dataArr[1]);
		}
		else if {(dataArr.length == 1)
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
			getMySpotify();
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