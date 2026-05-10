const weatherCodes = {

    0:"Despejado",
    1:"Mayormente despejado",
    2:"Parcialmente nublado",
    3:"Nublado",
    61:"Lluvia",
    63:"Lluvia fuerte",
    71:"Nieve"

};

function weatherIcon(code){

    if(code <= 1) return "☀️";
    if(code <= 3) return "☁️";
    if(code >= 61) return "🌧️";

    return "☁️";
}

// Obtener nombre de ciudad

async function getCity(lat, lon){

    const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );

    const data = await response.json();

    return data.address.city ||
           data.address.town ||
           data.address.village ||
           "Ubicación actual";
}

async function getWeather(lat, lon){

    const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`;

    const response = await fetch(url);

    const data = await response.json();

    // Nombre ciudad

    const city = await getCity(lat, lon);

    document.getElementById("city").innerText = city;

    // Temperatura

    document.getElementById("temp").innerText =
    Math.round(data.current.temperature_2m) + "°";

    document.getElementById("weather").innerText =
    weatherCodes[data.current.weather_code] || "Clima";

    document.getElementById("max").innerText =
    Math.round(data.daily.temperature_2m_max[0]) + "°";

    document.getElementById("min").innerText =
    Math.round(data.daily.temperature_2m_min[0]) + "°";

    // Descripción

    document.getElementById("description").innerText =
    `Actualmente ${weatherCodes[data.current.weather_code].toLowerCase()} con ${Math.round(data.current.temperature_2m)}°.`;

    // Fondo dinámico

    updateBackground(data.current.weather_code);

    // Horas

    const hourlyDiv = document.getElementById("hourly");

    hourlyDiv.innerHTML = "";

    for(let i=0; i<12; i++){

        const hour =
        new Date(data.hourly.time[i]).getHours();

        hourlyDiv.innerHTML += `

        <div class="hour">

            <div class="hour-time">
                ${hour}:00
            </div>

            <div class="hour-icon">
                ${weatherIcon(data.hourly.weather_code[i])}
            </div>

            <div class="hour-temp">
                ${Math.round(data.hourly.temperature_2m[i])}°
            </div>

        </div>
        `;
    }

    // Días

    const dailyDiv = document.getElementById("daily");

    dailyDiv.innerHTML = "";

    const days = [
        "Dom","Lun","Mar",
        "Mié","Jue","Vie","Sáb"
    ];

    for(let i=0; i<7; i++){

        const date =
        new Date(data.daily.time[i]);

        dailyDiv.innerHTML += `

        <div class="day">

            <div class="day-name">
                ${days[date.getDay()]}
            </div>

            <div class="day-icon">
                ${weatherIcon(data.daily.weather_code[i])}
            </div>

            <div class="day-temp">
                ${Math.round(data.daily.temperature_2m_min[i])}°
                /
                ${Math.round(data.daily.temperature_2m_max[i])}°
            </div>

        </div>
        `;
    }
}

// Fondos animados

function updateBackground(code){

    const bg = document.querySelector(".background");

    // Soleado

    if(code === 0){

        bg.className = "background sunny";
    }

    // Nublado

    else if(code <= 3){

        bg.className = "background cloudy";
    }

    // Lluvia

    else if(code >= 61){

        bg.className = "background rainy";
    }
}

// Ubicación automática

navigator.geolocation.getCurrentPosition((position)=>{

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    getWeather(lat, lon);

    setInterval(()=>{

        getWeather(lat, lon);

    }, 300000);

});