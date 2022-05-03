// Declaring the variables
let lon;
let lat;
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let icon = document.querySelector(".icon");
const kelvin = 273;

function showWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            // API URL
            const base =
                `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
                `lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df`;


            var response = await fetch(base);
            var data = await response.json();
            console.log("Weather Fetched");
            temperature.textContent =
                Math.floor(data.main.temp - kelvin) + "°C";
            summary.textContent = data.weather[0].description;
            loc.textContent = data.name + "," + data.sys.country;
            let icon1 = data.weather[0].icon;
            icon.innerHTML =
                `<img src="http://openweathermap.org/img/w/${icon1}.png" style= 'height:10rem'/>`;
        });
    }
}


showWeather();



