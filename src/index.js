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
      //supplies an index of 0 to handleEvent because 0 is the default index of day (today)
      handleEvent(data, 0);

      //adds toggle degree display event handler after the data has been retrieved from
      document
        .querySelector("#degree-toggle")
        .addEventListener("click", (event) => {
          //finds the active day and gets the index from the dataset.day
          const activeDay = document.querySelector(".active-day");
          const activeDayIndex = activeDay.dataset.day;
          console.log(activeDayIndex);

          handleEvent(data, activeDayIndex);
        });
    })
    .catch((e) => {
      console.log("Caught:", e);
    });
});

function handleEvent(data, activeDay) {
  const current = new CurrentWeather(data);
  updateCurrent(current);
  const week = getWeatherForDays(data, 7);
  displayWeek(week, activeDay);
  displayHours(week[activeDay]);
  console.table(current);
}

// There is a bug with my active day logic, i think im going to come back to this at a later stage.
//it seems to be handling the first time i set it, but not afterwards.

//im also adding multiple event listeners to the toggle every time i call the api, i need to
//take the toggle out of the api call.
