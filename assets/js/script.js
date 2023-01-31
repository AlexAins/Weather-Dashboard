// Variables
var submitBtn = document.getElementById("search-button");
var historyEl = document.getElementById("history");

// Calling api to get city coordinates
function forecast(calledCity){
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + calledCity + "&appid=e50faf4d6e538fcaace50d01fae799d5";

    fetch(queryURL)
    .then(response => response.json())
    .then(function(cityAPI){

        // Getting Lat and Lon values to call second API
        var cityLat = cityAPI[0].lat;
        var cityLon = cityAPI[0].lon;
        var cityName = cityAPI[0].name;

        // Calling api with Lat and Lon variable for Current forecast
        var queryURL2 = "https://api.openweathermap.org/data/2.5/weather?lat=" + cityLat + "&lon=" + cityLon + "&units=metric&appid=e50faf4d6e538fcaace50d01fae799d5";

        fetch(queryURL2)
        .then(response => response.json())
        .then(function(currentForecast){

            // Creating variables for all needed weather elements
            var currentTemp = currentForecast.main.temp;
            var currentHumidity = currentForecast.main.humidity;
            var currentWind = currentForecast.wind.speed;
            var currentIcon = currentForecast.weather[0].icon;
            var iconSrc = "http://openweathermap.org/img/w/" + currentIcon + ".png";

            // Getting current date variable
            var currentDate = moment();

            // Creating Elements for document
            var currentEl = document.getElementById("today");
            var currentCard = document.createElement("div");
            var currentCardBody = document.createElement("div");
            var currentCardTitle = document.createElement("h4");
            var currentCardIcon = document.createElement("img");
            var currentCardFactors = document.createElement("p");

            // Setting attributes for elements
            currentCard.setAttribute("class", "card");
            currentCardBody.setAttribute("class", "card-body border-primary ");
            currentCardTitle.setAttribute("class", "card-title");
            currentCardIcon.setAttribute("class", "card-img");
            currentCardIcon.setAttribute("src", iconSrc);
            currentCardIcon.setAttribute("style", "max-width: 50px");
            currentCardFactors.setAttribute("class", "card-text");
            
            // Setting Text for elements
            currentCardTitle.textContent = cityName + " (" + currentDate.format("DD/MM/YYYY") + ")";
            currentCardFactors.innerHTML = `<p> Temp: ${currentTemp}°C </p>
            <p> Humidity: ${currentHumidity}% </p>
            <p> Wind: ${currentWind}m/s </p>`;

            // Appending elements
            currentEl.appendChild(currentCard);
            currentCard.appendChild(currentCardBody);
            currentCardBody.appendChild(currentCardTitle);
            currentCardBody.appendChild(currentCardIcon);
            currentCardBody.appendChild(currentCardFactors);
        })

        // Calling api with  Lat and Lon variables for future forecast
        var queryURL3 = "http://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&units=metric&appid=e50faf4d6e538fcaace50d01fae799d5";

        fetch(queryURL3)
        .then(response => response.json())
        .then(function(futureForecast){

            // Creating are for future forecast
            var futureEl = document.getElementById("forecast");
            var futureCardDeck = document.createElement("div");

            futureCardDeck.setAttribute("class","card-deck");
            futureEl.appendChild(futureCardDeck);

            // Using for loop to get multiple days
            for(i=7; i<futureForecast.list.length; i+=8){

                // Creating variables for all needed weather elements
                var futureTemp = futureForecast.list[i].main.temp;
                var futureHumidity = futureForecast.list[i].main.humidity;
                var futureWind = futureForecast.list[i].wind.speed;
                var futureIcon = futureForecast.list[i].weather[0].icon;
                var iconSrc = "http://openweathermap.org/img/w/" + futureIcon + ".png";

                // Getting current date variable
                var unixFutureDate = futureForecast.list[i].dt;
                var futureDate = moment(unixFutureDate, "X");

                // Creating Elements for document
                var futureCard = document.createElement("div");
                var futureCardBody = document.createElement("div");
                var futureCardTitle = document.createElement("h4");
                var futureCardIcon = document.createElement("img");
                var futureCardFactors = document.createElement("p");

                // Setting attributes for elements
                futureCard.setAttribute("class", "card bg-secondary");
                futureCardBody.setAttribute("class", "card-body");
                futureCardTitle.setAttribute("class", "card-title");
                futureCardIcon.setAttribute("class", "card-img");
                futureCardIcon.setAttribute("src", iconSrc);
                futureCardIcon.setAttribute("style", "max-width: 50px");
                futureCardFactors.setAttribute("class", "card-text");
            
                // Setting Text for elements
                futureCardTitle.textContent =" (" + futureDate.format("DD/MM/YYYY") + ")";
                futureCardFactors.innerHTML = `<p> Temp: ${futureTemp}°C </p>
                <p> Humidity: ${futureHumidity}% </p>
                <p> Wind: ${futureWind}m/s </p>`;

                // Appending elements
                futureCardDeck.appendChild(futureCard);
                futureCard.appendChild(futureCardBody);
                futureCardBody.appendChild(futureCardTitle);
                futureCardBody.appendChild(futureCardIcon);
                futureCardBody.appendChild(futureCardFactors);
            }

            // Saving city to localStorage if new
            var searchedCities = JSON.parse(localStorage.getItem("previousCities"));
            
            if (searchedCities == null){
                searchedCities = [];
            };

            var newCity = cityName;

            if (searchedCities.includes(newCity) == false){
                searchedCities.push(newCity);
            }

            localStorage.setItem("previousCities", JSON.stringify(searchedCities));

            historyList();
        })      
    })
}

function historyList(){
  
    var historyList = JSON.parse(localStorage.getItem("previousCities"));

    historyEl.innerHTML = "";

    // console.log(historyList.length)

    if(historyList !== null){
        for (i=0; i<historyList.length; i++){

            var listEl = document.createElement("button");
            listEl.textContent = historyList[i];
            listEl.setAttribute("class", "list-group-item");
            listEl.setAttribute("id", historyList[i]);
    
            historyEl.appendChild(listEl);
        }
    }
}


historyList();

submitBtn.addEventListener('click', function(event){
    event.preventDefault();

    document.getElementById("today").innerHTML = "";
    document.getElementById("forecast").innerHTML = "";

    var inputCity = document.getElementById("search-input").value;

    forecast(inputCity);

    document.getElementById("search-input").value = "";
});

historyEl.addEventListener('click', function(event){
    var previousSearch =  event.target.getAttribute('id');

    document.getElementById("today").innerHTML = "";
    document.getElementById("forecast").innerHTML = "";

    forecast(previousSearch);
});

