import "./styles.css";
import { handleError } from "./error.js";
import { CurrentWeather } from "./current-weather.js";
import { DayWeather } from "./day-weather.js";

//Global variable for the API key
const API_KEY = "D22DDZSZ8J58JTVVUXHMVT3PX";

// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=D22DDZSZ8J58JTVVUXHMVT3PX

async function callApi(location) {
  const response = await fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
      location +
      "?key=" +
      API_KEY,
  );
  return response.json();
}

//adds error handling to the api call
const safeCallApi = handleError(callApi);

safeCallApi("london").then((data) => {
  console.log(data);
  // const current = new CurrentWeather(data);
  // console.log(current);

  const week = getWeatherForDays(data, 7);
  console.log(week);
});

//takes data from API call and an amount of days and returns an array of objects for the amount of days required
function getWeatherForDays(data, days) {
  if (!data) throw new Error("Data undefined");
  if (!days) throw new Error("Days undefined");

  const week = [];
  for (let i = 0; i < days; i++) {
    const day = new DayWeather(data, i);
    week.push(day);
  }
  return week;
}
