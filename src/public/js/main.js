const gradencelcius = document.querySelector("#gradencelcius");
const plaatsnaamInput = document.querySelector("#plaatsnaamInput");
const latitude = document.querySelector("#latitude");
const longitude = document.querySelector("#longitude");
const plaatsnaam = document.querySelector("#plaatsnaam");
const ophalenButton = document.querySelector("#ophalen");
const coordinateURL = document.querySelector("#coordinateURL");
const gradencelciusFeeling = document.querySelector("#gradencelcius_feeling");
const weerAfbeelding = document.querySelector("#weerAfbeelding");

ophalenButton.addEventListener("click", async (e) => {
    try {
        e.preventDefault();
        const plaatsnaamValue = plaatsnaamInput.value;
        await fetchData(plaatsnaamValue);
    } catch (error) {
        await fetchData("Amsterdam");
    }
});

async function fetchData(plaatsnaamValue) {
    try {
        const data = await fetch(`/api?q=${plaatsnaamValue}`);
        const res = await data.json();
        updateUI(res);
    } catch (error) {
        displayError();
    }
}

function updateUI(weatherData) {
    plaatsnaam.innerHTML = weatherData.name;
    gradencelcius.innerHTML = calculateCelsius(weatherData.main.temp).toFixed(
        1
    );
    gradencelciusFeeling.innerHTML = calculateCelsius(
        weatherData.main.feels_like
    ).toFixed(1);
    latitude.innerHTML = weatherData.coord.lat;
    longitude.innerHTML = weatherData.coord.lon;
    weerAfbeelding.src = weatherData.weather[0].icon;
    coordinateURL.innerHTML = `<a href="https://www.google.com/maps/search/?api=1&query=${weatherData.coord.lat},${weatherData.coord.lon}" target="_blank">Google Maps</a>`;
}

function displayError() {
    plaatsnaam.innerHTML = "Plaatsnaam niet gevonden";
}

// first load
document.addEventListener("DOMContentLoaded", async () => {
    await fetchData("Amsterdam");
});

// calculate kelvin to celsius
function calculateCelsius(kelvin) {
    return kelvin - 273.15;
}

// current year
const currentYear = new Date().getFullYear();
document.querySelector("#year").innerHTML = currentYear;
