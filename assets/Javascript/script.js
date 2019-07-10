// Initial array of movies
var animals = ["Cat", "Dog", "Mouse"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayAnimal() {

  var animal = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;
    //Clears Div
    $("#animals-view").empty();

    for (var i = 0; i < results.length; i++) {
        
        var animalDiv = $("<div>").addClass("limitWidth");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var animalImage = $("<img>").addClass("rounded");
        animalImage.attr("src", results[i].images.fixed_height.url);
        animalDiv.append(p);
        animalDiv.append(animalImage);
        $("#animals-view").prepend(animalDiv);

    }
  });
}

function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < animals.length; i++) {

    var a = $("<button>");
    a.addClass("animal-btn btn btn-dark m-1");
    a.attr("data-name", animals[i]);
    a.attr("type", "button");
    a.text(animals[i]);
    $("#buttons-view").append(a);
  }
}

$("#add-animal").on("click", function(event) {
  event.preventDefault();
  var animal = $("#animal-input").val().trim();
  animals.push(animal);
  renderButtons();
});

$(document).on("click", ".animal-btn", displayAnimal);

// Calling the renderButtons function to display the intial buttons
renderButtons();