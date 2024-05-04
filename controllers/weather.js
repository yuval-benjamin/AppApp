// Assuming you have a similar fetchWeatherApi function in JavaScript
const fetchWeatherApi = async (url, params) => {
    const queryString = Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    const response = await fetch(`${url}?${queryString}`);
    return response.json(); // or return JSON data from the API
};

// Parameters for the weather API
const params = {
    latitude: 32.0809,
    longitude: 34.7806,
    hourly: "temperature_2m"
};

const url = "https://api.open-meteo.com/v1/forecast";

// Fetch the weather data
const responses = await fetchWeatherApi(url, params);

// Helper function to form time ranges
const range = (start, stop, step) =>
    Array.from({ length: Math.ceil((stop - start) / step) }, (_, i) => start + i * step);

// Process the first location's weather data
const response = responses[0];

// Attributes for timezone and location
const utcOffsetSeconds = response.utc_offset_seconds; // JavaScript uses camelCase
const timezone = response.timezone;
const timezoneAbbreviation = response.timezone_abbreviation;
const latitude = response.latitude;
const longitude = response.longitude;

const hourly = response.hourly;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
    hourly: {
        time: range(Number(hourly.time[0]), Number(hourly.time_end), hourly.interval).map(
            (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        temperature2m: hourly.temperature_2m // Accessing the correct variable
    },
};

// Loop through the weather data and print datetime with temperature
for (let i = 0; i < weatherData.hourly.time.length; i++) {
    console.log(
        weatherData.hourly.time[i].toISOString(),
        weatherData.hourly.temperature2m[i]
    );
}