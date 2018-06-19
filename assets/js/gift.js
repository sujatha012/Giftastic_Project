// Creates variables.

var Gift = {};
var birds = ["Sparrow", "Parrot", "Dove", "Pigeon", "Goose", "Falcon", "Hummingbird", "Penquin", "Cuckoo",
    "Kiwi", "Swallow"];
Gift = ({


    initBindData: function () {


        // Function for displaying movie data
        this.renderButtons();
        $("#add-bird").on("click", function (event) {
            event.preventDefault();
            var bird = $("#bird-input").val().trim();
            if (bird != "")
                birds.push(bird);
            Gift.renderButtons();
        });


    },

    renderButtons: function () {

        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#birds").empty();

        // Looping through the array of movies
        for (var i = 0; i < birds.length; i++) {

            var a = $("<button>");
            a.addClass("btn btn-primary");
            a.attr("data-bird", birds[i]);
            a.text(birds[i]);
            $("#birds").append(a);
        }
        $("button").bind("click", this.onclick);

    },
    onclick: function (event) {
        // Grabbing and storing the data-bird property value from the button
        var bird = $(this).attr("data-bird");

        // Constructing a queryURL using the bird name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            bird + "&api_key=w2Z4HU6oi5Hlax5smeE2wVUmKlhaDx2h&limit=10";

        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
            .then(function (response) {
                console.log(queryURL);

                console.log(response);
                // storing the data from the AJAX request in the results variable
                var results = response.data;

                $("#gifs-appear-here").empty();
                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                    // Creating and storing a div tag

                    var birdDiv = $("<div class='item'>");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var birdImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    birdImage.attr("src", results[i].images.fixed_height_still.url);
                    birdImage.attr("data-still", results[i].images.fixed_height_still.url);
                    birdImage.attr("data-animate", results[i].images.fixed_height.url);
                    birdImage.attr("data-state", "still");
                    birdImage.attr("class", "gif");

                    // Appending the paragraph and image tag to the animalDiv
                    birdDiv.append(p);
                    birdDiv.append(birdImage);

                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifs-appear-here").prepend(birdDiv);
                }

                $(".gif").on("click", function () {
                    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                    var state = $(this).attr("data-state");
                    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                    // Then, set the image's data-state to animate
                    // Else set src to the data-still value
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });
            });

    }
});


$(document).ready(function () {
    Gift.initBindData();

});



