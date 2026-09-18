//Fetching City Data
const city = document.querySelector('#cityInput');
const search = document.querySelector('#searchBtn');

search.addEventListener('click', searchCity);

city.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchCity();
    }
});

function searchCity(){
   const cityName = city.value.trim();
    console.log(`Searching for weather in: ${cityName}`);
    fetchWeatherData(cityName);
    city.value = ''; 
}

async function fetchWeatherData(cityName) {
    const apiKey = '4b9aca39f8d44ba787290557252107';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data;
}