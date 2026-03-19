import "./styles.css";
import { handleError } from "./error.js";
import { CurrentWeather } from "./current-weather.js";

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
  const current = new CurrentWeather(data);
  console.log(current);
});
