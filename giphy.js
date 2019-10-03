//initializes after the document has loaded
$(document).ready(function(){

// Initial array of cars
var cars = ["Audi", "BMW", "Mercedes", "Acura", "Infiniti", "Porsche", "Dodge", "Ford", "Volvo", "Maserati", "Fiat", "Toyota", "Lexus", "Hyundai", "Kia"];
             
// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of cars
    for (var i = 0; i < cars.length; i++) {

      // Then dynamicaly generating buttons for each car in the array
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of car to our button
      a.addClass("car");
      // Adding a data-attribute
      a.attr("data-name", cars[i]);
      // Providing the initial button text
      a.text(cars[i]);
      // Adding the button to the HTML
      $("#buttons-view").append(a);
    }
  }   

// This function handles events where one button is clicked
$("#search-car").on("click", function(event) {

    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();

    // This line grabs the input from the textbox
    var carInput = $("#car-input").val().trim();

    // Adding the movie from the textbox to our array
    cars.push(carInput);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();


    
    

});

//Function that displays the gif using ajax call
function getGif() {


var carName = $(this).attr("data-name");

//Concatenation of the search url with the search term and api key
 var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
 carName + "&api_key=o8yLqpswHBgLXjXQNuvzUmOG2XpKEOEk";

 $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {
       // Storing an array of results in the results variable
       var results = response.data;
       // Looping over every result item
       for (var i = 0; i < results.length; i++) {

         // Only taking action if the photo has an appropriate rating
         if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
           // Creating a div for the gif
           var gifDiv = $("<div>");

           // Storing the result item's rating
           var rating = results[i].rating;

           // Creating a paragraph tag with the result item's rating
           var p = $("<p>").text("Rating: " + rating);

           // Creating an image tag
           var carImage = $("<img>");

           // Giving the image tag an src attribute of a proprty pulled off the
           // result item
           carImage.attr("src", results[i].images.fixed_height.url);

           // Appending the paragraph and personImage we created to the "gifDiv" div we created
           gifDiv.append(p);
           gifDiv.append(carImage);

           // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
           $("#gifs-appear-here").prepend(gifDiv);
         }
       }

     
   });
}
 /*  // Adding click event listener to the button clicked
$("button").on("click", function() {

    // prevent form from submitting
    event.preventDefault();


    

console.log(car);

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
          carDiv.append(carImage);

          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").prepend(carDiv);
        }
      });
        
});*/

$(document).on("click", ".car", captureCarName);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
});