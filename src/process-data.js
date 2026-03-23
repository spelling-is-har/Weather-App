import { CurrentWeather } from "./current-weather.js";
import { updateCurrent, displayWeek, displayHours } from "./dom.js";
import { getWeatherForDays } from "./week-weather.js";

export function processData(data, activeDay) {
  const current = new CurrentWeather(data);
  updateCurrent(current);
  const week = getWeatherForDays(data, 7);
  displayWeek(week, activeDay);
  displayHours(week[activeDay]);
}
