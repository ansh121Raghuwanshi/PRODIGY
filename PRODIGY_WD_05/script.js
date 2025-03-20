const apiKey = "4dd41f3e76948d73bf94ff0260a2de2d"; // 🔥 Replace with your OpenWeather API key

// Fetch weather by city name
function getWeather() {
    const city = document.getElementById("city-input").value;
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

// Fetch weather by user's location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
            },
            (error) => {
                alert("Location access denied! Please enter a city manually.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Fetch and display weather data
function fetchWeather(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("City not found!");
                return;
            }

            document.getElementById("weather-info").innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>${data.weather[0].description.toUpperCase()}</p>
                <p>🌡️ Temperature: ${data.main.temp}°C</p>
                <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
            `;
        })
        .catch(() => alert("Failed to fetch weather data!"));
}
