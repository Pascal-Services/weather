const gradencelcius = document.querySelector("#gradencelcius");
const plaatsnaamInput = document.querySelector("#plaatsnaamInput");
const latitude = document.querySelector("#latitude");
const longitude = document.querySelector("#longitude");
const plaatsnaam = document.querySelector("#plaatsnaam");
const ophalenButton = document.querySelector("#ophalen");
const coordinateURL = document.querySelector("#coordinateURL");
const gradencelcius_feeling = document.querySelector("#gradencelcius_feeling");
const weerAfbeelding = document.querySelector("#weerAfbeelding");

ophalenButton.addEventListener("click", async (e) => {
    try {
        e.preventDefault();

        const plaatsnaamValue = plaatsnaamInput.value;

        await getData(plaatsnaamValue);
    } catch (error) {
        await getData("Amsterdam");
    }
});

async function getData(plaatsnaamValue) {
    try {
        const data = await fetch("/api?q=" + plaatsnaamValue);

        const res = await data.json();

        plaatsnaam.innerHTML = res.name;
        gradencelcius.innerHTML = calculateCelsius(res.main.temp).toFixed(1);
        gradencelcius_feeling.innerHTML = calculateCelsius(
            res.main.feels_like
        ).toFixed(1);
        latitude.innerHTML = res.coord.lat;
        longitude.innerHTML = res.coord.lon;
        weerAfbeelding.src = res.weather[0].icon;
        coordinateURL.innerHTML = `<a href="https://www.google.com/maps/search/?api=1&query=${res.coord.lat},${res.coord.lon}" target="_blank">Google Maps</a>`;
    } catch (error) {
        plaatsnaam.innerHTML = "Plaatsnaam niet gevonden";
    }
}

// first load
document.addEventListener("DOMContentLoaded", async () => {
    getData("Amsterdam");
});

// calculate kelvin to celsius
function calculateCelsius(kelvin) {
    return kelvin - 273.15;
}

const currentYear = new Date().getFullYear();
document.querySelector("#year").innerHTML = currentYear;
