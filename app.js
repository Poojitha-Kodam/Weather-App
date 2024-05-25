const searchBtn = document.querySelector(".search-btn");
const degTemp = document.querySelector(".deg");
const description = document.querySelector(".description");
const humidity = document.querySelector(".weather-humidity");
const windSpeed = document.querySelector(".wind");
const inputBox = document.querySelector(".input");
const weatherImg = document.querySelector(".image");
const locationNotFound = document.querySelector(".location-not-found")
const weatherBox = document.querySelector(".weather-box");
const humiWind = document.querySelector(".humi-wind");

async function weather_data(city) {
  const api_key = "39ea8e82d364c5f317e6d2db36c129bc";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_info = await fetch(url).then((res) => res.json());
  console.log(weather_info);

  if(weather_info.cod === `404`){
    locationNotFound.style.display="flex";
    weatherBox.style.display="none";
    humiWind.style.display="none";
    console.log("error");
    return;
  }
  locationNotFound.style.display="none";
  weatherBox.style.display="flex";
  humiWind.style.display="flex";

  degTemp.innerHTML = `${Math.round(weather_info.main.temp - 273.15)}°C`;

  description.innerHTML = `${weather_info.weather[0].description}`;

  humidity.innerHTML = `${weather_info.main.humidity}%`;

  windSpeed.innerHTML = `${weather_info.wind.speed} Km/h`;

    if (weather_info.weather[0].main == "Clouds") {
      weatherImg.src = "assets/cloud.png";
    } else if (weather_info.weather[0].main == "Clear") {
      weatherImg.src = "assets/clear.png";
    } else if (weather_info.weather[0].main == "heavy rains") {
      weatherImg.src = "assets/heavyRain.png";
    } else if (weather_info.weather[0].main == "Rain") {
      weatherImg.src = "assets/rain.png";
    } else if (weather_info.weather[0].main == "Mist") {
      weatherImg.src = "assets/rain.png";
    }else if (weather_info.weather[0].main == "Partly Cloudy") {
        weatherImg.src = "assets/partly-cloudy.png";
      }
}
searchBtn.addEventListener("click", () => {
  weather_data(inputBox.value);
  inputBox.value = "";
});
