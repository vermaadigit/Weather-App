const API_KEY = '5310a0a3ba3c9e90578cbeb274588afa';

async function showWeather() {

    // let latitude = 15.3333;
    // let longitude = 75.6167;

    let city = 'Goa';

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

    const data = await response.json();
    console.log("Weather Data: ", data);

    let temperature = data.main.temp; // Fetching the temperature from the API response
    console.log("Temperature: ", temperature);

    let humidity = data.main.humidity; // Fetching the humidity from the API response
    console.log("Humidity: ", humidity);

    let newPara = document.createElement('p');
    newPara.textContent = `City: ${data.name}, Temperature: ${temperature}°C, Humidity: ${humidity}%`;

    document.body.appendChild(newPara);
}