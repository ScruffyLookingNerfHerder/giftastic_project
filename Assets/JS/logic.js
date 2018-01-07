var characters = ["Aria Stark", "Aragorn", "Admiral Ackbar", "Brienne of Tarth", "Boromir", "Boba Fett", "Cersei Lannister", "Legolas", "C3P0", "Davos Seaworth", "Gandalf", "Darth Vader"];



function createbuttons() {

  $("#gif-buttons").empty();
  for (var i = 0; i < characters.length; i++) {
    var a = $("<button>");
    a.addClass("character-button");
    a.attr("data-name", characters[i]);
    a.text(characters[i]);
    $("#gif-buttons").append(a);

  }

}

function displaygifs(){
  var character = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=5707N4cYZcPQWwhsS7Yl7MDF4tAQBgYn&q=" + character + "&limit=10&offset=0&lang=en";
  $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          var results = response.data;
          console.log(results.length);
            for (var i = 0; i < results.length; i++){
              var individualgifdiv = $("<div class = 'individual-gifs'>");
              var rating = results[i].rating;
              var r = $("<p>").text("Rating: " + rating);
              var gifimg = $("<img>");
              gifimg.attr("src", results [i].images.fixed_height.url);
              individualgifdiv.append(r);
              individualgifdiv.prepend(gifimg);

              $("#gif-field").prepend(individualgifdiv);
            }
        });

}


//on click event for submit button
$("#find-gif").on("click", function(event) {
  event.preventDefault();
  var useraddedcharacter = $("#gif-input").val().trim();
  characters.push(useraddedcharacter);
  createbuttons();

});

createbuttons();

$(document).on("click", ".character-button", displaygifs);
createbuttons();
