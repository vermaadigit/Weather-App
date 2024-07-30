const userTab = document.querySelector('[data-userWeather]');
const searchTab = document.querySelector('[data-searchWeather]');
const userContainer = document.querySelector('.weather-container');
const grantAccessContainer = document.querySelector('.grantlocation-container');
const searchForm = document.querySelector('[data-searchForm]');
const loadingScreen = document.querySelector('.loading-container');
const userInfoContainer = document.querySelector('.user-info-Container');


//Initially needed Variables

let currentTab = userTab;
const API_KEY = "5310a0a3ba3c9e90578cbeb274588afa";
currentTab.classList.add("current-tab");

function switchTab(clickedTab) {
    if(clickedTab != currentTab) {
        currentTab.classList.remove('current-tab');
        currentTab = clickedTab;
        currentTab.classList.add('current-tab');

        if(!searchForm.classList.contains('active')) {
            userInfoContainer.classList.remove('active');
            grantAccessContainer.classList.remove('active');
            searchForm.classList.add('active');
        }
        else
        {
            searchForm.classList.remove('active');
            userInfoContainer.classList.remove('active');
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener('click', () => {
    switchTab(userTab);
});

searchTab.addEventListener('click', () => {
    switchTab(searchTab);
});


//Coordinates Checker
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem('user-coordinates');
    if(!localCoordinates) {
        grantAccessContainer.classList.add('active');
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates) {
    const {lat, long} = coordinates;

    //Make Grant Container Invisible
    grantAccessContainer.classList.remove('active');

    //Make Loader Visible
    loadingScreen.classList.add('active');

    //API Call
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        loadingScreen.classList.remove('active');
        userInfoContainer.classList.add('active');
        renderWeatherInfo(data);
    }
    catch(err) {
        loadingScreen.classList.remove('active');
        console.log(err);
    }
}

function renderWeatherInfo(weatherInfo) {
    const cityName = document.querySelector('[data-cityName]');
    const countryIcon = document.querySelector('[data-countryIcon]');
    const desc = document.querySelector('[data-weatherDesc]');
    const weatherIcon = document.querySelector('[data-weatherIcon]');
    const temp = document.querySelector('[data-temp]');
    const windSpeed = document.querySelector('[data-windSpeed]');
    const humidity = document.querySelector('[data-humidity]');
    const cloudiness = document.querySelector('[data-cloudiness]');

    //Fetch Values from weather Info objects and put in UI elements
    cityName.innerText = weatherInfo.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo.sys.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo.weather.description;
    weatherIcon.src = `http://openweathermap.org/img/wn/${weatherInfo.weather.icon}.png`;
    temp.innerText = `${weatherInfo.main.temp}°C`;   
    windSpeed.innerText = `${weatherInfo.wind.speed} m/s`;
    humidity.innerText = `${weatherInfo.main.humidity}%`;
    cloudiness.innerText = `${weatherInfo.clouds.all}%`;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        //HW - Show an Alert for no geplocation support available
    }
}

function showPosition(position) {
    const userCordinates = {
        lat: position.coords.latitude,
        long: position.coords.longitude
    }

    sessionStorage.setItem('user-coordinates', JSON.stringify(userCordinates));

    fetchUserWeatherInfo(userCordinates);
}

const grantAccessButton = document.querySelector('[data-grantAccess]');
grantAccessButton.addEventListener('click', getLocation);

const searchInput = document.querySelector('[data-searchInput]');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (searchInput.value === "") return;

    fetchSearchWeatherInfo(searchInput.value);
});

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add('active');
    userInfoContainer.classList.remove('active');
    grantAccessContainer.classList.remove('active');

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);\
        const data = await response.json;
        loadingScreen.classList.remove('active');
    }
    catch(err) {
        //HW
    
    }
}
