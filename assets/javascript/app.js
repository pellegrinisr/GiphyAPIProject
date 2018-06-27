
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
                myGifArray[i] = response.data[i];
            }
            $('.gif-display').html('');
            for (var i = 0; i < myGifArray.length; i++) {
                var newImageTag = $('<img>').addClass('my-gif-image').attr('src', myGifArray[i].images.downsized_still.url);
                $('.gif-display').append(newImageTag);
            }
        });
    };

    // $('.my-gif-image').hover(
    //     function(event) {
    //         console.log(event);
    //     }, function() {
    //         console.log('mouse leaving');
    //     }
    // );
    
    $('.add-search-term').on('click', function() {
        var newButtonText = $('.search-term').val();
        console.log(newButtonText);
        var newButton = $('<button>').addClass('gif-search-button btn btn-primary').text(newButtonText);
        $('.button-additions').append(newButton);
    });

    $(document).on('click', '.gif-search-button', displayInfo);
    $(document).on('mouseenter', '.my-gif-image', function(event) {
        var currentTargetGif;
        var i = 0;
        var isFound = false;
        // for (var i = 0; i < myGifArray.length; i++) {
        //     if (event.target)
        // }
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
        //event.target.src = currentTargetGif.images.downsized.url;
       // console.log(event.target.src);
    });
    $(document).on('mouseleave', '.my-gif-image', function(event) {
        
    })
});