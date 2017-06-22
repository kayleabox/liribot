var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");
var inquirer = require("inquirer");
var keys = require("./keys.js");
var fs = require("fs");
var twitterClient = new twitter(keys.twitterKeys);
var spotifyClient = new spotify ({
    id: "8912ac2e0cd948238b8f2f49d64c3d32", 
    secret: "83d9301f7d01463a8e7fafe73c68cebd"
});

var mapChoices = {
    //************************************************************************
	"Get Tweets": function(){ 
        //get last 20 tweets
        console.log("tweeting!");
        twitterClient.get('statuses/user_timeline',{count: '20'}, function(error, tweets, response) {
            if(error) throw error;
            for (i=0; i<tweets.length; i++){
                console.log(tweets[i].user.screen_name + ": " + tweets[i].text);  // The favorites. 
                //console.log(response);  // Raw response object. 
                fs.appendFile("log.txt", 
                tweets[i].user.screen_name + ": " + tweets[i].text+" \n", 
                function(err){
                    if(err){
                        console.log(err);
                    }
                });
            }
        });
    },
    //************************************************************************
    //************************************************************************
	
    "Spotify This": function(){
        console.log("spotifying")
        //This will show the following information in the terminal
        //artist(s), song's name, preview link of the song from Spotify, album
        inquirer.prompt([
            {type:"input", name:"song", message:"what song should we look up?", default: "i want it that way"}
        ]).then(function(user){
            //use spotify to get the info! 
            
            spotifyClient.search({ type: 'track', query: user.song, limit: "1" })
            .then(function(response) {
                //console.log(JSON.stringify(response.tracks.items[0]))//used this to figure out how to get the artists
                //console.log(response.tracks.items);
                console.log("song: "    + response.tracks.items[0].name); 
                console.log("artists: " + response.tracks.items[0].artists[0].name);
                console.log("album: "   + response.tracks.items[0].album.name);
                console.log("preview: " + response.tracks.items[0].preview_url);

                fs.appendFile("log.txt",
                    "song: "    + response.tracks.items[0].name+" "+ 
                    "artists: " + response.tracks.items[0].artists[0].name+" "+
                    "album: "   + response.tracks.items[0].album.name+" "+
                    "preview: " + response.tracks.items[0].preview_url+" \n",
                    function(err){
                        if(err){
                            console.log(err);
                        }
                    } 
                )
            })
            .catch(function(err) {
                console.log(err);
            });
        
        })

     },

    //*************************************************************************
     //************************************************************************
	
    "Movie This": function(){
        //title, year, IMDB Rating, country produced in, language, plot sum., 
        //actor, rotten tomatoes url
        inquirer.prompt([
            {type:"input", name:"movie", message:"what movie should we look up?", default: "Mr. Nobody"}
        ]).then(function(user){
            //use OMBD to get the info!
            var queryUrl = "http://www.omdbapi.com/?apikey=40e9cece&t=" + user.movie + "&y=&plot=short&r=json";
            
            request(queryUrl, function(error, response, body){

                if(!error && response.statusCode === 200){
                    //console.log(response);
                    console.log("title: "        + JSON.parse(body).Title);
                    console.log("release year: " + JSON.parse(body).Year);
                    console.log("rating: "       + JSON.parse(body).imdbRating);
                    console.log("plot: "         + JSON.parse(body).Plot);
                    console.log("actors: "       + JSON.parse(body).Actors)
                    console.log("language: "     + JSON.parse(body).Language);
                    console.log("country: "      + JSON.parse(body).Country);
                    console.log("website: "      + JSON.parse(body).Website);


                fs.appendFile("log.txt",
                    "title: "        + JSON.parse(body).Title+" "+
                    "release year: " + JSON.parse(body).Year+" "+
                    "rating: "       + JSON.parse(body).imdbRating+" "+
                    "plot: "         + JSON.parse(body).Plot+" "+
                    "actors: "       + JSON.parse(body).Actors+" "+
                    "language: "     + JSON.parse(body).Language+" "+
                    "country: "      + JSON.parse(body).Country+" "+
                    "website: "      + JSON.parse(body).Website+" \n",
                    function(err){
                        if(err){
                            console.log(err);
                        }
                    } 
                )

            }


            }); //request ends here
        });
     },

    //***********************************************************************
    //************************************************************************
	
    "Random": function(){
        //run a random command on random.txt (should be spotify this)
        var action, song; 
        fs.readFile("random.txt", "utf-8", function(err, data){
            if(err){
                return undefined;
            }
            console.log(data);
            var dataArr = data.split(",");
            action = dataArr[0], song = dataArr[1]

            spotifyClient.search({ type: 'track', query: dataArr[1], limit: "1" })
            .then(function(response) {
                //console.log(JSON.stringify(response.tracks.items[0]))//used this to figure out how to get the artists
                //console.log(response.tracks.items);
                console.log("song: "    + response.tracks.items[0].name); 
                console.log("artists: " + response.tracks.items[0].artists[0].name);
                console.log("album: "   + response.tracks.items[0].album.name);
                console.log("preview: " + response.tracks.items[0].preview_url);

                fs.appendFile("log.txt",
                    "song: "    + response.tracks.items[0].name+" "+ 
                    "artists: " + response.tracks.items[0].artists[0].name+" "+
                    "album: "   + response.tracks.items[0].album.name+" "+
                    "preview: " + response.tracks.items[0].preview_url+" \n",
                    function(err){
                        if(err){
                            console.log(err);
                        }
                    } 
                )            
        
            })
            .catch(function(err) {
                console.log(err);
            });

            //mapChoices[dataArr[0]]()//have to change the spotify this function 
        })

     },
	
}

inquirer.prompt([
    {type: "list",
    name: "action",
    message: "what would you like to do?",
    choices:["Get Tweets", "Spotify This", "Movie This", "Random"]
    }
]).then(function(user){
    console.log(user.action);
    var action = user.action;
    mapChoices[action](); // make sure to add () after [action] to call the function
})


