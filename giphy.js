var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
cars + "&api_key=o8yLqpswHBgLXjXQNuvzUmOG2XpKEOEk&limit=10";


$.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(apiResponse){
        console.log(apiResponse);
        $("#movie-view").text(JSON.stringify(apiResponse));
});  