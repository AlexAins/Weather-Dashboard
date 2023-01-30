// Variables
var submitBtn = document.getElementById("search-button");

// Calling api to get city coordinates
function trial(){
    var calledCity = document.getElementById("search-input").value;

    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + calledCity + "&appid=e50faf4d6e538fcaace50d01fae799d5";

    fetch(queryURL)
    .then(response => response.json())
    .then(function(cityAPI){

        // Getting Lat and Lon values to call second API
        var cityLat = cityAPI[0].lat;
        var cityLon = cityAPI[0].lon;

        // Calling api with Lat and Lon variable for Current forecast
        var queryURL2 = "https://api.openweathermap.org/data/2.5/weather?lat=" + cityLat + "&lon=" + cityLon + "&units=metric&appid=e50faf4d6e538fcaace50d01fae799d5";

        fetch(queryURL2)
        .then(response => response.json())
        .then(function(currentForecast){

            // Creating variables for all needed weather elements
            var cityName = cityAPI[0].name;
            var currentTemp = currentForecast.main.temp;
            var currentHumidity = currentForecast.main.humidity
            var currentWind = currentForecast.wind.speed
            console.log(cityName);
            console.log(currentTemp, currentHumidity, currentWind);
            console.log(currentForecast);
        })

        // Calling api with  Lat and Lon variables for future forecast
        var queryURL3 = "http://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&appid=e50faf4d6e538fcaace50d01fae799d5";

        fetch(queryURL3)
        .then(response => response.json())
        .then(function(futureForecast){
            console.log(futureForecast);
        })
    })
}


submitBtn.addEventListener('click', function(event){
    event.preventDefault();

    trial();
});
