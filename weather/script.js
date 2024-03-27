window.addEventListener("load", () => {
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", () => {
        const cityInput = document.getElementById("cityInput").value;
        if (cityInput.trim() !== "") {
            fetchWeatherDataByCity(cityInput);
        }
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            const lon = position.coords.longitude;
            const lat = position.coords.latitude;
            fetchWeatherDataByCoords(lat, lon);
        });
    }
});

function fetchWeatherDataByCoords(lat, lon) {
    const api_key = ""; //input your key
    const base = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
    fetchWeatherData(base);
}

function fetchWeatherDataByCity(city) {
    const api_key = "";  //input your key
    const base = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    fetchWeatherData(base);
}

function fetchWeatherData(url) {
    let temperature = document.querySelector(".temp");
    let summary = document.querySelector(".summary");
    let loc = document.querySelector(".location");
    const kelvin = 273;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            temperature.textContent = Math.floor(data.main.temp - kelvin) + "°C";
            summary.textContent = data.weather[0].description;
            loc.textContent = data.name + "," + data.sys.country;
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
}
