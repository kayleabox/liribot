var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var inquirer = require("inquirer");


var mapChoices = {
    //************************************************************************
	"Get Tweets": function(){ 
        //get last 20 tweets
    },
    //************************************************************************
    //************************************************************************
	
    "Spotify This": function(){
        //This will show the following information in the terminal
        //artist(s), song's name, preview link of the song from Spotify, album
        inquirer.prompt([
            {type:"input", name:"song", message:"what song should we look up?", default: "i want it that way"}
        ]).then(function(user){
            //use spotify to get the info!

        });
     },

    //*************************************************************************
     //************************************************************************
	
    "Movie This": function(){
        //title, year, IMDB Rating, country produced in, language, plat sum., 
        //actor, rotten tomatoes url
        inquirer.prompt([
            {type:"input", name:"movie", message:"what song should we look up?", default: "i want it that way"}
        ]).then(function(user){
            //use OMBD to get the info!

        });
     },

    //***********************************************************************
    //************************************************************************
	
    "Random": function(){
        //run a random command on random.txt (should be spotify this)
     },
	
}

inquirer.prompt([
    {type: "list",
    name: "action",
    message: "what would you like to do?",
    choices:["Get Tweets", "Spotify This", "Movie This", "Random"]
    }
]).then(function(user){
    mapChoices.user.answer;
})


