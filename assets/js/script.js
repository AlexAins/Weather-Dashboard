// Variables
var submitBtn = document.getElementById("search-button");


// Calling api to get city coordinates
function trial(){
    var calledCity = document.getElementById("search-input").value;

    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + calledCity + "&appid=e50faf4d6e538fcaace50d01fae799d5"

    fetch(queryURL)
    .then(response => response.json())
    .then(function(response){
    
    // Getting Lat and Lon values to call second API
    var cityLat = response[0].lat;
    var cityLon = response[0].lon;

    // Calling api with new Lat and Lon variables
    var queryURL2 = "http://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&appid=e50faf4d6e538fcaace50d01fae799d5"

    fetch(queryURL2)
    .then(response => response.json())
    .then(function(finalResponse){
        console.log(finalResponse);
    })
    
    })
}

submitBtn.addEventListener('click', function(event){
    event.preventDefault();

    trial();
});
