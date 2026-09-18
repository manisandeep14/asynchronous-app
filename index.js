//Fetching City Data
const cityInput = document.querySelector('#cityInput');
const search = document.querySelector('#searchBtn');

//city name, weather icon, temperature, condition, humidity, wind speed, and feels like temperature

const cityName = document.querySelector('#cityName');
const weatherIcon = document.querySelector('#weatherIcon');
const temperature = document.querySelector('#temp');
const condition = document.querySelector('#condition');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
const feelsLike = document.querySelector('#feelsLike');

search.addEventListener('click',searchCity);

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchCity();
    }
});

async function searchCity(){
  try {
    const city = cityInput.value.trim();
      if(city !== ''){
      const data = await fetchWeatherData(city);

      cityName.textContent = data.location.name;

      weatherIcon.src = data.current.condition.icon;
      console.log(data.current.condition.icon);

      temperature.textContent = `${data.current.temp_c}°C`;

      condition.textContent = data.current.condition.text;

      humidity.textContent = `Humidity: ${data.current.humidity}%`;

      wind.textContent = `Wind Speed: ${data.current.wind_kph} kph`;

      feelsLike.textContent = `Feels Like: ${data.current.feelslike_c}°C`;

      
    }else{
      alert('Please enter a city name');
    } 
  } catch (error) {
    alert('Failed to fetch weather data. Please try again later.');
  } 
  cityInput.value = '';
}

async function fetchWeatherData(cityName) {
    const apiKey = '4b9aca39f8d44ba787290557252107';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}