//initializes after the document has loaded
$(document).ready(function(){

// Initial array of cars
var cars = ["Audi", "BMW", "Mercedes", "Acura", "Infiniti", "Porsche", "Dodge", "Ford", "Volvo", "Maserati", "Fiat", "Toyota", "Lexus", "Hyundai", "Tesla"];
var results;
  
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

renderButtons();

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
       results = response.data;
       // Looping over every result item
       for (var i = 0; i < results.length; i++) {


           // Creating a div for the gif
           var carDiv = $("<div>");

           // Storing the result item's rating
           var rating = $("<p class='rating'>").text("Rating: " + results[i].rating);
          
           

           // Creating an image tag
           var carImage = $("<img>");

           // Giving the image tag an src attribute of a proprty pulled off the
           // result item
           carImage.addClass("image-gifs");
           carImage.attr("src", results[i].images.fixed_height_still.url);
           carImage.attr("data-state", "still");
           carImage.attr("data-position", i);
           

           // Appending the paragraph and personImage we created to the "gifDiv" div we created
           carDiv.append(rating);
           carDiv.append(carImage);
          

           // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
           $("#gifs-appear-here").prepend(carDiv);
        };
    });
    
}    
   

//Calling the getGif function everytime a button with the class ".car" gets clicked
$(document).on("click", ".car", getGif);

    function animate() {

        
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        var position = $(this).attr("data-position");
        position = parseInt(position);
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", results[position].images.fixed_height.url);
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", results[position].images.fixed_height_still.url);
          $(this).attr("data-state", "still");
        }
      
    };

    $(document).on("click", ".image-gifs", animate);
      
});
