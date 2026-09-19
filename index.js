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

//loader
const loading = document.querySelector('#loading');

//city not found message
const cityNotFound = document.querySelector('#error');

//local storage for last searched city
const searchedCities = document.querySelector('#historyList');

const clearBtn = document.querySelector('#clearBtn');




search.addEventListener('click',searchCity);

cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchCity();
    }
});

async function searchCity(){
  const city = cityInput.value.trim();

  if(city === ''){
    alert('Please enter a city name');
    return;
  }

  loading.classList.remove('hidden');
  cityNotFound.classList.add('hidden');
  search.disabled = true;

  try {
      const data = await fetchWeatherData(city);

      cityName.textContent = data.location.name;

      weatherIcon.src = data.current.condition.icon;

      temperature.textContent = `${data.current.temp_c}°C`;

      condition.textContent = data.current.condition.text;

      humidity.textContent = `Humidity: ${data.current.humidity}%`;

      wind.textContent = `Wind Speed: ${data.current.wind_kph} kph`;

      feelsLike.textContent = `Feels Like: ${data.current.feelslike_c}°C`;

      saveToLocalStorage(city, data.current.temp_c, data.current.condition.text);
      renderHistoryList();
  } catch (error) {
    cityNotFound.classList.remove('hidden');
  } finally {
    loading.classList.add('hidden');
    search.disabled = false;
    cityInput.value = '';
  }
}

async function fetchWeatherData(cityName) {
  try{
    const apiKey = '4b9aca39f8d44ba787290557252107';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    if(data.error){
      throw new Error(data.error.message);
    }
    return data;
  } catch (error) {
    cityNotFound.textContent = error.message;
    cityNotFound.classList.remove('hidden');
    throw error;
  }  
}

function renderLocalStorage(){
  return JSON.parse(localStorage.getItem('searchedList')) || [];
}

function saveToLocalStorage(cityName, temperature, condition) {

  const List = renderLocalStorage();
  const existingCity = List.find(item => item.cityName.toLowerCase() === cityName.toLowerCase());

  if (existingCity) {
    existingCity.cityName = cityName;
    existingCity.temperature = temperature;
    existingCity.condition = condition;
  } else {
    List.push({ cityName, temperature, condition });
  }

  localStorage.setItem('searchedList', JSON.stringify(List));

}


function clearLocalStorage() {
  localStorage.removeItem('searchedList');
  historyList = [];
  searchedCities.innerHTML = '';
}

clearBtn.addEventListener('click' ,clearLocalStorage);

function renderHistoryList() {
  const List = renderLocalStorage();
  searchedCities.innerHTML = "";
  List.forEach(item => {
    searchedCities.innerHTML += `<li>${item.cityName} - ${item.temperature}°C - ${item.condition}</li>`;
  });
}

//Dynamic touch feature to display the recently searched city weather

searchedCities.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const cityName = e.target.textContent.split(' - ')[0];
    cityInput.value = cityName;
    searchCity();
  }
});

renderHistoryList();