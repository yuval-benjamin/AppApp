async function getWeatherInfo() {
  // Static coordinates for Tel Aviv, Israel
  const coordinates = {
      lat: 32.0853,
      lon: 34.7818
  }

  const currentWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min`

  try {
      const response = await fetch(currentWeatherUrl)
      if (!response.ok) throw new Error('Error fetching weather data')

      const data = await response.json()

      // Extract current temperature and weather conditions
      const currentTemp = data.current_weather.temperature
      const isRaining = data.current_weather.weathercode >= 61 && data.current_weather.weathercode <= 65

      // Extract daily temperature range
      const dailyMax = data.daily.temperature_2m_max[0]
      const dailyMin = data.daily.temperature_2m_min[0]

      // Calculate daily average
      const dailyAverage = ((dailyMax + dailyMin) / 2).toFixed(1)

      // Determine which icon to show
      const weatherIcon = isRaining
          ? '<i class="bi bi-cloud-drizzle"></i>'
          : '<i class="bi bi-brightness-high"></i>'

      // Set weather section background
      const weatherSection = document.querySelector('.weather')
      if (isRaining) {
          weatherSection.style.backgroundImage = 'url("/images/rainy-sky.jpg")'
      } else {
          weatherSection.style.backgroundImage = 'url("/images/clear-sky.jpg")'
      }

      let workoutRecommendation = ''
      if (isRaining) {
          workoutRecommendation = 'It\'s raining so might not be the best day for an outdoor workout, we recommend you stay cozy and dry with an indoor workout for today'
      } else if (currentTemp > 27) {
          workoutRecommendation = 'It\'s quite hot for an outdoor workout, we recommend you to stay cool with an indoor workout today'
      } else {
          workoutRecommendation = 'Seems like it\'s a great day for an outdoor workout, go get some fresh air :)'
      }

      // Display weather information and recommendation
      document.getElementById('weather-info').innerHTML = `
          The current temperature is ${currentTemp}°C ${weatherIcon}<br>
          ${workoutRecommendation}
      `.trim()
  } catch (error) {
      document.getElementById('weather-info').innerText = 'Error fetching weather data: ' + error.message
  }
}

// Fetch weather information as soon as the page loads
window.onload = getWeatherInfo
