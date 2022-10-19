//variaveis e seleção de elementos
const apiKey = "2a2edbdd20ffe5055201f25a49417e27";
const apiCountryUrl = "https://countryflagsapi.com/png/"
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#descriptioin')
const weatherIconElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const humidityElement = document.querySelector('#umidity')
const windElement = document.querySelector('#wind')
const dataForm = document.querySelector('#weather-data')
const alertError = document.querySelector('#error_alert')

//funções



    const getWeatherData = async (city) => {


        const apiweatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

        const res = await fetch(apiweatherURL)
        const data = await res.json()
        console.log(data)

        if (data.cod === "404") {
            dataForm.style.display = "none"
            alertError.style.display = "block"
            ocument.body.style.backgroundColor = "rgb(35, 156, 136)"
          }else {
            document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;
            dataForm.style.display = "block"
            alertError.style.display = "none"
            return data
          }
    }

    const showWeatherData = async (city) => {
       const data = await getWeatherData(city);

      cityElement.innerText = data.name;
      tempElement.innerText = parseInt(data.main.temp)
      descElement.innerText = data.weather[0].description
      weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
      countryElement.setAttribute("src", apiCountryUrl + data.sys.country)
      humidityElement.innerText = `${data.main.humidity}%`
      windElement.innerText = `${data.wind.speed}km/h`
    }

//eventos

searchBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const city = cityInput.value;

    showWeatherData(city)
})

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = e.target.value

        showWeatherData(city)
    }
})
