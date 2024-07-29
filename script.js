const API_KEY = '454b589d9ab192483f018109056fa211';

async function showWeather() {
    // let latitude = 15.3333;
    // let longitude = 75.6167;

    let city = 'Goa';

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

    const data = response.json();
    console.log("Weather Data: ", data);
}