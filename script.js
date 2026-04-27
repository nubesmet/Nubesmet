const apiKey = "3399e9b93e21b7137420bc219ba60962";
const city = "Pachuca";

async function getWeather() {
    try {
        const url = https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es;

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod != 200) {
            document.getElementById("currentWeather").innerHTML = <p>Error: ${data.message}</p>;
            return;
        }

        document.getElementById("currentWeather").innerHTML = `
            <h2>${data.name}</h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            <h1>${Math.round(data.main.temp)}°C</h1>
            <p>${data.weather[0].description}</p>
            <p>Humedad: ${data.main.humidity}%</p>
        `;

    } catch (error) {
        document.getElementById("currentWeather").innerHTML = <p>Error al cargar clima</p>;
        console.log(error);
    }
}

getWeather();