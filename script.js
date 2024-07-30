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
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`);\
        const data = await response.json();

        loadingScreen.classList.remove('active');
        userInfoContainer.classList.add('active');
    }
    catch(err) {
        console.log(err);
    }
}
