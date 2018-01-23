//original button array
var characters = ["Aria Stark", "Aragorn", "Admiral Ackbar", "Brienne of Tarth", "Boromir", "Boba Fett", "Cersei Lannister", "Legolas", "C3P0", "Davos Seaworth", "Gandalf", "Darth Vader"];


//function to create buttons
function createbuttons() {
  //empties the buttons
  $("#gif-buttons").empty();
  //loops through character array
  for (var i = 0; i < characters.length; i++) {
    //creates a button for each character
    var ogcharacters = $("<button>");
    //adds class to each button for styling
    ogcharacters.addClass("character-button buttonclass");
    //gives each button data-attribute of the character's name
    ogcharacters.attr("data-name", characters[i]);
    //prints the character name on the button
    ogcharacters.text(characters[i]);
    //pushes the button to the DOM and appends
    $("#gif-buttons").append(ogcharacters);

  }

}

function displaygifs() {
  //sets character to the value name of the button that was clicked
  var character = $(this).attr("data-name");
  //sets giphy query url
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=5707N4cYZcPQWwhsS7Yl7MDF4tAQBgYn&q=" + character + "&limit=10&offset=0&lang=en";
  //empties the div field for the gifs
  $("#gif-field").empty();
  //ajax call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    //puts results into workable variable
    var results = response.data;
    //loops through results
    for (var i = 0; i < results.length; i++) {
      //sets individual div for each gif returned and gives it a class
      var individualgifdiv = $("<div class = 'individual-gifs'>");
      //gets the rating from the results
      var rating = results[i].rating.toUpperCase();
      //prints the rating
      var r = $("<p>").text("Rating: " + rating);
      //creates an img class for each gif
      var gifs = $("<img class = 'gifs'>");
      //sets src for each gif (still by default)
      gifs.attr("src", results[i].images.fixed_height_still.url);
      //creates state attribute and sets it to stil by default
      gifs.attr("data-state", "still");
      //stores still attribute under data-still
      gifs.attr("data-still", results[i].images.fixed_height_still.url);
      //stores animated attribute under data-animate
      gifs.attr("data-animate", results[i].images.fixed_height.url);
      //appends the rating
      individualgifdiv.append(r);
      //prepends the gif above the rating
      individualgifdiv.prepend(gifs);
      //pushes whole individual gif div to the DOM
      $("#gif-field").append(individualgifdiv);


    }

  });

}



function animation() {
  //grab the state attribute which we set earlier
  var state = $(this).attr("data-state");
  //if state is set to still
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
  //if state is set to animate
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

};


//on click event for submit button
$("#find-gif").on("click", function(event) {
  event.preventDefault();
  var useraddedcharacter = $("#gif-input").val().trim();
  characters.push(useraddedcharacter);
  createbuttons();

});

//on click event for clear button
$("#clear-field").on("click", function(event) {
  //ensures any user-created buttons are not deleted
  event.preventDefault();
  //empties the div field
  $("#gif-field").empty();
})


//on click event to display gifs when button is pressed
$(document).on("click", ".character-button", displaygifs);
//on click event to animate gis when clicked on
$(document).on("click", ".gifs", animation);
//calls function to create buttons
createbuttons();
