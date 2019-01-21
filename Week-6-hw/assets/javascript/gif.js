
//load JS document before loading page
$(document).ready(function(){
//Array of types of dogs for the beginning buttons
var dogs = ['lab', 'poodle', 'boston terrier', 'golden retriver', 'pug', 'beagle', 'boxer', 'bulldog', 'husky', 'corgi'];

//CREATE THE BUTTONS (on the fly)
function renderButtons(){
    //first, clear and remove elements within the buttons DIV
        $("#buttons-view").empty();
    //for loop to itterate over the array of dogs and add them to the DIV
        for(var i = 0; i < dogs.length; i++){
            //create the buttons on the fly, add a class, insert the individual item from the array
            var dogButton = $('<button>');
            dogButton.addClass('button');
            dogButton.attr('data-name', dogs[i]);
            dogButton.text(dogs[i]);

            $("#buttons-view").append(dogButton);
        };
    };

    $("#add-dog").on("click", function(event){
        event.preventDefault();
        //create and IF/ELSE statement to alert the user that the input cannot be blank
        //when a input is submitted we push the value 
        var dogType = $("#dog-input").val().trim();
            if (dogType == ''){
                alert('This field cannot be blank')
            }else{        
                dogs.push(dogType);
                $("#dog-input").val("");
            };


        renderButtons();
        // console.log(dogs);

    });

    renderButtons();



/////API/ AJAX CALL///////

function displayGifs() {
    //define variables
    var apiKey = "ZXuv30YURnGG9ruUgjnPviS9N9abfZWA";
    var dogName = $(this).attr("data-name");
    // dogName = "lab";
//split methods will split the string into an array, and then add the "+" when j0ind back together 
    var dogType = dogName.split(" ").join("+");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dogType + "&api_key=ZXuv30YURnGG9ruUgjnPviS9N9abfZWA&limit=10";


    //AJAX REQUEST
    $.ajax({
        url: queryURL,
        method: "GET",
        //promise callback//when the response comes back--execute the callback
    }).then(function(response){

        console.log(queryURL);
        console.log(response.data[0]);

        $("#dog-gifs").empty();
        //for loop to iterate through each array element, grab the response data.imge.fixed.url (OBJECT PATH)
        for (var i = 0; i < response.data.length; i++){
            // delcare variable, creating a div, paragraph, image URL and dog imag on the fly
            var dogDiv = $("<div>");
            var p = $("<p class = 'rating'>").text("Rated: " + response.data[i].rating);
            var imageURL = response.data[i].images.fixed_height_still.url;
            var dogImage = $("<img>").attr("src", imageURL);


            dogImage.addClass("gifs")
            dogImage.attr("src", response.data[i].images.fixed_height_still.url);

            dogDiv.append(p);
            dogDiv.append(dogImage);

          $("#dog-gifs").append(dogDiv);
            

        };
    });
};
//call the function
$(document).on("click", ".button", displayGifs);





/////////////////////////////ON CLICK FUNCTION FOR GIFS/////////////////////
//capture the gifs class using jquery
$(".gifs").on("click", function() {
    var state = $(this).attr("data-state");

    if (state === "still"){
      var url = $(this).attr("data-animate")
      $(this).attr("src", url);
      $(this).attr("data-state", "animate");
    } else {
      var url = $(this).attr("data-still");
      $(this).attr("src", url);
      $(this).attr("data-state", "still");
    } 
    });


});

 

