const apiKey = "86fe6293a4b5c777cbf6885ca1cdd810"; // Replace with your API key
const getWeatherBtn = document.getElementById("getWeather");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        weatherResult.innerHTML = "<p>Please enter a city name.</p>";
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) throw new Error("City not found!");

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherResult.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Function to change background dynamically based on weather condition

function changeBackground(condition) {
    let imageUrl = "";

    if (condition.includes("clear sky")) {
        imageUrl = "images/clearsky.jpg"; // Clear blue sky
    } else if (condition.includes("few clouds")) {
        imageUrl = "images/clouds.jpeg"; // A few clouds
    } else if (condition.includes("scattered clouds")) {
        imageUrl = "images/clouds.jpeg"; // Scattered clouds
    } else if (condition.includes("broken clouds")) {
        imageUrl = "images/clouds.jpeg"; // Partly cloudy
    } else if (condition.includes("overcast clouds")) {
        imageUrl = "images/clouds.jpeg"; // Fully cloudy sky
    } else if (condition.includes("light rain") || condition.includes("drizzle")) {
        imageUrl = "images/drizzle.webp"; // Light rain or drizzle
    } else if (condition.includes("moderate rain") || condition.includes("heavy rain")) {
        imageUrl = "images/rainy.jpg"; // Heavy rain
    } else if (condition.includes("thunderstorm")) {
        imageUrl = "images/thunderstorm.jpg"; // Stormy background
    } else if (condition.includes("snow")) {
        imageUrl = "images/snow.jpg"; // Snowy background
    } else if (condition.includes("mist") || condition.includes("fog") || condition.includes("haze")) {
        imageUrl = "images/fog.jpg"; // Mist or fog
    } else {
        imageUrl = "images/default.jpg"; // Default fallback image
    }

    document.body.style.background = `url('${imageUrl}') no-repeat center center/cover`;
}


function displayWeather(data) {
    // Pass weather description (text) instead of ID
    changeBackground(data.weather[0].description.toLowerCase());

    weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>${data.weather[0].description}</p>
        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">
    `;
}

