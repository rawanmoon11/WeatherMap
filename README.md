# WeatherMap

## Description
WeatherMap is a single-page web application. The user enters a city name, and the app shows a marker on the map with the current weather information for that location, without reloading the page.

## Live Demo

## Features
- Search for any city, address, or place.
- Smooth map animation to the searched location with a single marker.
- Popup with temperature, clouds, humidity, wind speed, weather description, and the official weather icon.
- Share button (copies the weather message to the clipboard) and Facebook share button.
- Loading spinner and user-friendly error messages (city not found, weather data not found, too many requests).
- Responsive design for mobile and desktop.

## Technologies
- HTML5
- CSS3
- Vanilla JavaScript (async/await, Fetch API)

## APIs Used
- OpenWeatherMap Current Weather API
- Nominatim (OpenStreetMap) Geocoding API
- Leaflet.js with OpenStreetMap tiles

## How to Run
1. Download or clone this repository.
2. Get a free API key from [openweathermap.org](https://openweathermap.org).
3. Open `javascript.js` and put your key in the `apikey` constant at the top of the file:
   ```js
   const apikey = "YOUR_API_KEY";
   ```
4. Open `index.html` using Live Server in VS Code .

## Student
Rawan Mamoon
