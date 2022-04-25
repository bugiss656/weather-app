# Weather app
## Description
This project is an frontend app for a weather-app-api: [https://github.com/mbugiel656/weather-app-api](https://github.com/mbugiel656/weather-app-api). It's written in `React` and `typescript`, styles are implemented in `TailwindCSS`.

**Tech stack**:

 - React
 - typescript
 - TailwindCSS
 - Recharts
 - axios
 - luxon

## Details
The application is an dashboard for displaying weather data. Database includes example weather data for three cities: `Warsaw`, `Wroclaw` and `Cracow`.

**Functionalities**:

 - `initial data` - when loading application it's initialy loads temperature data for a city name set in the `DEFAULT_CITY` variable

 - `text search input` - allows to search for weather data by `city name`, while entering the text a dropdown list with proposed results is displayed

 - `latest temperature data` -  a card component with the latest temperature data for a given city

 - `last 14 days temperature` - a list component with last 14 days temperature data for a given city

 - `last 14 days max temperature` - a chart component with last 14 days maximum temperature data for a given city. 
