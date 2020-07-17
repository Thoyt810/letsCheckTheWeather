$("#searchBtn").on("click", function (event) {

    $("#searchResults").empty();
    $("#fiveDay").empty();

    var searchCity = $(".searchTerm").val();

    var citybtn = $("<h2>").text(searchCity)

    citybtn.addClass("city")

    $(".oldSearches").append(citybtn);

    showWeatherCard(searchCity);

    fiveDayForcast(searchCity);
})

$(document).on("click", ".city", function (event) {

    $("#searchResults").empty();
    $("#fiveDay").empty();

    var reSearch = $(this)[0].innerHTML;

    console.log(reSearch)

    showWeatherCard(reSearch);

    fiveDayForcast(reSearch)
})



function showWeatherCard(city) {

    var apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a236c9f5070f6421bfa1ed630e34d5e9"

    $.ajax({
        url: apiURL,
        method: "GET"
    }).then(function (response) {

        var resultDiv = $("<div>")

        var pOne = $("<h3>").text(city)

        resultDiv.append(pOne)

        var temp = $("<p>").text("Temperature " + Math.floor(((response.main.temp - 273.15) * 1.8) + 32), + " F")

        resultDiv.append(temp);

        var humidity = $("<p>").text("Humidity- " + response.main.humidity + "%")

        resultDiv.append(humidity);

        var windSpeed = $("<p>").text("Windspeed- " + response.wind.speed + "mph")

        resultDiv.append(windSpeed);

        $("#searchResults").append(resultDiv)

    })

}

function fiveDayForcast(city) {

    var apiURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=a236c9f5070f6421bfa1ed630e34d5e9"

    $.ajax({
        url: apiURL,
        method: "GET"
    }).then(function (response) {

        for (i = 0; i < 4; i++) {

            var resultDiv = $("<div>")

            var pOne = $("<h3>").text(city)

            resultDiv.append(pOne)

            var arrayDates = response.list

            var date = $("<p>").text(arrayDates[i].dt_txt)

            resultDiv.append(date);

            var temp = $("<p>").text("Temperature " + Math.floor(((arrayDates[i].main.temp - 273.15) * 1.8) + 32), + " F")

            resultDiv.append(temp);

            var humidity = $("<p>").text("Humidity- " + arrayDates[i].main.humidity + "%")

            resultDiv.append(humidity);

            $("#fiveDay").append(resultDiv);
        }

    })

}