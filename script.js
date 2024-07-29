const API_KEY = '5310a0a3ba3c9e90578cbeb274588afa';

async function fetchWeatherDetails() {

    // let latitude = 15.3333;
    // let longitude = 75.6167;

    try {
        let city = 'Mumbai';

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

    const data = await response.json();
    console.log("Weather Data: ", data);

    // let temperature = data.main.temp; // Fetching the temperature from the API response
    // console.log("Temperature: ", temperature);

    // let humidity = data.main.humidity; // Fetching the humidity from the API response
    // console.log("Humidity: ", humidity);

    // let newPara = document.createElement('p');
    // newPara.textContent = `City: ${data.name}, Temperature: ${temperature}°C, Humidity: ${humidity}%`;

    // document.body.appendChild(newPara);
    }
    catch (error) {
        console.log("Error: ", error);
    }
    
}

async function getCustomWeatherDetails() {
    let latitude = 82.8628;
    let longitude = 135.0000;

    let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    let data = await result.json();

    console.log("Custom Weather Data: ", data);

    let value = data.main.temp;
    console.log("Temperature: ", value);
}

function switchTab(clickedTab) {
    apiErrorContainer.classList.remove("active");

    if (clickedTab != currentTab) {
        currentTab.classList.remove('current-tab');
        currentTab = clickedTab;
        currentTab.classList.add('current-tab');
    }

    if (!searchForm.classList.contains("active")) {
        userInfoContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active");
        searchForm.classList.add("active");
    }
    else
    {
        searchForm.classList.remove("active");
        userInfoContainer.classList.remove("active");
        getFromSessionStorage();
    }
}