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
    }
}

userTab.addEventListener('click', () => {
    switchTab(userTab);
});

searchTab.addEventListener('click', () => {
    switchTab(searchTab);
});
