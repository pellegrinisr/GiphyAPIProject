//This application will allow the user to enter a search term or phrase
//and dynamically create buttons that will trigger calls to the GIPHY API.
//Clicking these buttons will add still images of the GIFs to the page.
//When the user hovers over a GIF, it will animate.
//When they hover off of a GIF, it will revert to the still version.
//Lastly, when the user clicks on a GIF, the GIF will be stored at the
//top of the page in its animated form.        
$(document).ready(function(){
    var apiKey = "m4cc9q2uN5odLT2Ah4j4SovzsT1vI2x9";
    var myQueryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=";
    var myGifArray = [];
    var numGifs = 15;
    var currentTargetGif;
    var stillImageUrl;
    //function called when user clicks the add-search-term button
    //gets data from the giphy api
    function displayInfo(event) {
        console.log(event);
        var mySearchTerm = event.target.innerText.trim().replace(' ', '+');
        console.log(myQueryURL + mySearchTerm);
        $.ajax({
            url: myQueryURL + mySearchTerm,
            method: 'GET'
        }).then(function(response){
            console.log(response);
            for (var i = 0; i < numGifs; i++) {
                myGifArray[i] = response.data[i];
            }
            $('.gif-display').html('');
            for (var i = 0; i < myGifArray.length; i++) {
                var newImageTag = $('<img>').addClass('my-gif-image').attr('src', myGifArray[i].images.downsized_still.url);
                var gifRating = $('<div>').addClass('gif-rating').html('Rating: ' + myGifArray[i].rating);
                var newGifDiv = $('<div>').addClass('new-gif');
                newGifDiv.append(newImageTag).append(gifRating);
                $('.gif-display').append(newGifDiv);
            }
        });
    };
    //click event handler for the add-search-term button
    //creates a new button element and appends the button to the page
    $('.add-search-term').on('click', function() {
        //verify that search-term input isn't blank
        if ($('.search-term').val() != '') {
            var newButtonText = $('.search-term').val();
            console.log(newButtonText);
            var newButton = $('<button>').addClass('gif-search-button btn btn-primary').text(newButtonText);
            $('.button-additions').append(newButton);
        }
    });
    //attach event handler to the responsively created buttons
    //calls the displayInfo function
    $(document).on('click', '.gif-search-button', displayInfo);
    //mouseenter event handler for gif images in search results
    //will change the image source from the still image to the moving image
    $(document).on('mouseenter', '.my-gif-image', function(event) {
        var i = 0;
        var isFound = false;
        stillImageUrl = event.currentTarget.src;
        console.log('mouseenter event: ' + event.target.src);
        while (isFound === false && i < myGifArray.length) {
            if (event.currentTarget.src === myGifArray[i].images.downsized_still.url) {
                currentTargetGif = myGifArray[i];
                isFound = true;
            }
            i++;
        }
        console.log(currentTargetGif);
        event.currentTarget.src = currentTargetGif.images.downsized.url;
    });
    //mouseleave event listener for the gif images in search results
    //changes the image source back to the still image
    $(document).on('mouseleave', '.my-gif-image', function(event) {
        event.currentTarget.src = stillImageUrl;
    });
    //click event listener for the gif images in the search results
    //when clicked the gif will be stored in the top div beneath the jumbotron
    $(document).on('click', '.my-gif-image', function(event) {
        //create a new <img> to hold the source of the clicked image
        var newImageTag = $('<img>').addClass('saved');
        //change the source attribute to the src of the clicked gif
        $(newImageTag).attr('src', event.currentTarget.src);
        //prepend it to the saved-gifs div
        $('.saved-gifs').prepend(newImageTag);
    })
});