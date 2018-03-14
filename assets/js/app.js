var singersArray = ["Beyonce", "Shakira", "P!nk", "Drake", "Justin Timberlake", "Lady Gaga","Jay-Z","John Legend", "J Cole", "Katy Perry", "Jhene Aiko", "Big Sean", "Sam Smith"];

$(document).ready(function() {
    for (var i = 0; i < singersArray.length; i++) {
        $("#singer-buttons").append("<button type='button' onclick='searchGif(\"" + singersArray[i] + "\")' class='btn btn-info' value=' " + singersArray[i] + "'> " + singersArray[i] + " </button>");
    }
});

function singerButtonClicked() {
    var userInput = $('#singer-input').val();
    searchGif(userInput);
}

function submitButtonClicked() {
    var userInput = $('#singer-input').val();

    if (userInput) {
        $('#singer-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-info' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=dc6zaTOxFJmzC',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

function displayGif(response) {
    $('#singers').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#singers').append(image);
    }

    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}