import "./styles.css";
import { handleError } from "./error.js";
import { CurrentWeather } from "./current-weather.js";
import { DayWeather } from "./day-weather.js";
import { callApi } from "./api-call.js";
import { updateCurrent, displayWeek, displayHours } from "./dom.js";

//adds error handling to the api call
const safeCallApi = handleError(callApi);

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

document.querySelector("#location-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const location = document.querySelector("#location").value;
  safeCallApi(location)
    .then((data) => {
      handleEvent(data);
    })
    .catch((e) => {
      console.log("Caught:", e);
    });
});

function handleEvent(data) {
  console.log(data);
  const current = new CurrentWeather(data);
  updateCurrent(current);
  const week = getWeatherForDays(data, 7);
  console.log(week);
  displayWeek(week);
  displayHours(week[1]);
  console.table(current);
}

// safeCallApi("Paris").then((data) => {
//   // console.log(data);
//   // const current = new CurrentWeather(data);
//   // console.log(current);
//   // const week = getWeatherForDays(data, 7);
//   // console.log(week);
// });
