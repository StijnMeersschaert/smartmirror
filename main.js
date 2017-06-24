$(document).ready(function () {
    const apiUrl = "https://api.darksky.net/forecast/94752888a8c1ea257f570a41fde48c63/";

    // Check if navigator is available
    if (!navigator.geolocation) {
        window.alert("Geolocation is not supported by your browser");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function (position) {
            let latitude = position.coords.latitude,
                longitude = position.coords.longitude;

            $.ajax({
                url: apiUrl + latitude + ',' + longitude,
                jsonp: "callback",
                dataType: "jsonp",
                success: function (json) {
                    // set the current temperature
                    $(".temp").html(
                        Math.floor((json.currently.temperature - 32) * 5 / 9) + "°"
                    );
                    // set short text
                    $(".short").html(json.currently.summary);

                    // set the current temperature icon
                    const icons = {
                        "clear-day": "wi-day-sunny",
                        "clear-night": "wi-night-clear",
                        "rain": "wi-rain",
                        "snow": "wi-snow",
                        "sleet": "wi-sleet",
                        "wind": "wi-windy",
                        "fog": "wi-fog",
                        "cloudy": "wi-cloud",
                        "partly-cloudy-day": "wi-day-cloudy",
                        "partly-cloudy-night": "wi-night-alt-cloudy"
                    };
                    $(".icon").html(
                        '<i class="wi ' +
                        (icons[json.currently.icon] || icons["clear-day"]) +
                        '"></i>'
                    );
                }
            });

            $.ajax({
                url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&key="+ "AIzaSyAl-WMKlOdoBuqboALuqb8diF-XyNO1YFQ",
                jsonp: "callback",
                dataType: "jsonp",
                success: function (json) {
                    console.log("succes");
                    let address = json.results[0].formatted_address;
                    $(".location").html(address);
                }
            });
        });
});