
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const searchInput = document.querySelector(".search-box input");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");
let lastClickTime = 0;  

function searchWeather() {
  const apiKEY = "863def2fb0e26951383e06cce6199aa3";
  const city = document.querySelector(".search-box input").value;

  if (city == "") {
    return;
  }
  const now = Date.now();
  const elapsedTime = now - lastClickTime;

  if (elapsedTime < 1500) {
    // Eğer son tıklamadan bu yana 2 saniyeden kısa bir süre geçtiyse işlem yapma
    return;
  }

  lastClickTime = now;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKEY}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        cityHide.textContent = city;
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }

      console.log("Gelen Veri:", json); // Gelen veriyi konsola yazdır
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      if (cityHide.textContent == city) {
        return;
      } else {
        cityHide.textContent = city;
        container.style.height = "555px";
        weatherBox.classList.add("active");
        container.classList.add("active");
        weatherDetails.classList.add("active");
        error404.classList.remove("active");

        setTimeout(() => {
          container.classList.remove("active");
        }, 1500);

        console.log(json.weather[0].main);
        switch (json.weather[0].main) {
          case "Clear":
            image.src = "src/images/clear.png";
            break;
          case "Rain":
            image.src = "src/images/rain.png";
            break;
          case "Snow":
            image.src = "src/images/snow.png";
            break;
          case "Clouds":
            image.src = "src/images/clouds.png";
            break;
          case "Mist":
          case "Haze":
            image.src = "src/images/mist.png";
            break;
          default:
            image.src = "src/images/clear.png";
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}<span>%</span>`;
        wind.innerHTML = `${parseInt(json.wind.speed)}<span>Km/h</span>`;

        const infoWeather = document.querySelector(".weather-info");
        const infoHumidity = document.querySelector(".humidity-info");
        const infoWind = document.querySelector(".wind-info");

        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfoHumidity = infoHumidity.cloneNode(true);
        const elCloneInfoWind = infoWind.cloneNode(true);

        elCloneInfoWeather.id = "clone-info-weather";
        elCloneInfoWeather.classList.add("active-clone");

        elCloneInfoHumidity.id = "clone-info-humidity";
        elCloneInfoHumidity.classList.add("active-clone");

        elCloneInfoWind.id = "clone-info-wind";
        elCloneInfoWind.classList.add("active-clone");

        setTimeout(() => {
          infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
          infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
          infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
        }, 1000);

        const cloneInfoWeather = document.querySelectorAll(
          ".weather-info.active-clone"
        );
        const totalCloneInfoWeather = cloneInfoWeather.length;
        const cloneInfoWeatherFirst = cloneInfoWeather[0];

        const cloneInfoHumidity = document.querySelectorAll(
          ".humidity-info.active-clone"
        );
        const cloneInfoHumidityFirst = cloneInfoHumidity[0];

        const cloneInfoWind = document.querySelectorAll(
          ".wind-info.active-clone"
        );
        const cloneInfoWindFirst = cloneInfoWind[0];

        if (totalCloneInfoWeather > 0) {
          cloneInfoWeatherFirst.classList.remove('active-clone');
          cloneInfoHumidityFirst.classList.remove('active-clone');
          cloneInfoWindFirst.classList.remove('active-clone');

          setTimeout(() => {
            cloneInfoWeatherFirst.remove();
            cloneInfoHumidityFirst.remove();
            cloneInfoWindFirst.remove();
          }, 1000);
        }

      }
    })
    .catch((error) => {
      console.error("Hata Oluştu:", error); // Hata durumunu konsola yazdır
    });
};
search.addEventListener("click", searchWeather);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchWeather();
  }
});

