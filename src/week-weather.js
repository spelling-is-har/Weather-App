import { DayWeather } from "./day-weather.js";

//takes data from API call and an amount of days and returns an array of objects for the amount of days required
export function getWeatherForDays(data, days) {
  if (!data) throw new Error("Data undefined");
  if (!days) throw new Error("Days undefined");

  const week = [];
  for (let i = 0; i < days; i++) {
    const day = new DayWeather(data, i);
    week.push(day);
  }
  return week;
}
