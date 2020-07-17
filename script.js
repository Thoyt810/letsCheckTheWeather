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

    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d86f82eb4672cf317372a2f04d1e0383"

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

    var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=d86f82eb4672cf317372a2f04d1e0383"

    $.ajax({
        url: apiURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        for (i = 0; i < 4; i++) {

            var resultDiv = $("<div class = fiveDay>")

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