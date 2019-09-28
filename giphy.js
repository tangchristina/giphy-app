   // Adding click event listen listener to all buttons
$("button").on("click", function() {
    // Grabbing and storing the data-animal property value from the button
    var car = $(this).attr("data-car");
    

console.log(car);
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
car + "&api_key=o8yLqpswHBgLXjXQNuvzUmOG2XpKEOEk&limit=10";


$.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(apiResponse){
        console.log(queryURL);
        console.log(apiResponse);
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var carDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var carImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          carImage.attr("src", results[i].images.fixed_height.url);

          // Setting the src attribute of the image to a property pulled off the result item
          carImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and image tag to the animalDiv
          carDiv.append(p);
          carDiv.append(animalImage);

          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").prepend(carDiv);
        }
      });
        
});
