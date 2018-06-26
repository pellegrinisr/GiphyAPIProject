
$(document).ready(function(){
    var apiKey = "m4cc9q2uN5odLT2Ah4j4SovzsT1vI2x9";
    var myQueryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=";
    var myGifArray = [];
    var numGifs = 15;
    
    function displayInfo(event) {
        console.log(event);
        var mySearchTerm = event.target.innerText;
        console.log(myQueryURL + mySearchTerm);
        $.ajax({
            url: myQueryURL + mySearchTerm,
            method: 'GET'
        }).then(function(response){
            console.log(response);
            for (var i = 0; i < numGifs; i++) {
                myGifArray[i] = response.data[i].images.downsized.url;
            }
            for (var i = 0; i < myGifArray.length; i++) {
                var newImageTag = $('<img>').attr('src', myGifArray[i]);
                $('.gif-display').append(newImageTag);
            }
        });
    };
    
    $('.add-search-term').on('click', function() {
        var newButtonText = $('.search-term').val();
        console.log(newButtonText);
        var newButton = $('<button>').addClass('gif-search-button btn btn-primary').text(newButtonText);
        $('.button-additions').append(newButton);
    });

    $(document).on('click', '.gif-search-button', displayInfo);
});