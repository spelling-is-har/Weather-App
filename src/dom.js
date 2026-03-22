import { safeLoadImage } from "./load-image";

export function updateCurrent(data) {
  if (!data) throw new Error("Data undefined");

  const location = document.querySelector(".location-display");
  location.textContent = data.address;

  const icon = document.querySelector(".current-icon");
  icon.textContent = data.icon;

  const iconImage = document.createElement("img");

  safeLoadImage(data)
    .then((response) => {
      iconImage.src = response;
    })
    .catch((e) => {
      console.log("Failed to load image:", e);
    });

  icon.append(iconImage);

  const description = document.querySelector("#current-description");
  description.textContent = data.description;

  const temp = document.querySelector(".current-temp");
  temp.textContent = degreeDisplay(data.temp);
}

export function displayWeek(data, activeDay) {
  const weekContainer = document.querySelector(".week-container");
  //clears weeksContainer for update
  weekContainer.innerHTML = "";

  for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
    const dayContainer = createDay(data[dayIndex], dayIndex, activeDay);
    weekContainer.append(dayContainer);
  }

  return weekContainer;
}

//i is the index to determine what day of the week it it,
function createDay(data, dayIndex, activeDay) {
  console.log(`dayIndex: ${dayIndex}, activeDay: ${activeDay}`);
  const container = domHelper("div", "day-container");
  container.dataset.day = dayIndex;
  if (dayIndex === activeDay) container.classList.add("active-day");

  container.addEventListener("click", (event) => {
    // removes active day class from the previously clicked active day
    const oldActiveDay = document.querySelector(".active-day");
    oldActiveDay.classList.remove("active-day");

    container.classList.add("active-day");
    displayHours(data);
  });

  const iconImage = domHelper("img", "icon");

  safeLoadImage(data)
    .then((response) => {
      iconImage.src = response;
    })
    .catch((e) => {
      console.log("Failed to load image:", e);
    });

  const day = domHelper("p", "day");
  day.textContent = data.day;

  const date = domHelper("p", "date");
  date.textContent = data.dateTime;

  const tempMin = domHelper("p", "temp");
  tempMin.classList.add("min");
  tempMin.textContent = degreeDisplay(data.tempMin);

  const tempMax = domHelper("p", "temp");
  tempMax.classList.add("max");
  tempMax.textContent = degreeDisplay(data.tempMax);

  container.append(day, date, iconImage, tempMax, tempMin);

  return container;
}

export function displayHours(data) {
  const hoursContainer = document.querySelector(".hours-container");
  hoursContainer.innerHTML = "";

  for (let i = 0; i < 24; i++) {
    const hour = createHour(data.hours[i]);
    hoursContainer.append(hour);
  }
}

function createHour(data) {
  const hourContainer = domHelper("div", "hour-container");

  const iconImage = domHelper("img", "icon");
  safeLoadImage(data)
    .then((response) => {
      iconImage.src = response;
    })
    .catch((e) => {
      console.log("Failed to load image:", e);
    });

  const time = domHelper("p", "time");
  time.textContent = data.time.toString();

  const temp = domHelper("p", "temp");
  temp.textContent = degreeDisplay(data.temp);

  hourContainer.append(time, iconImage, temp);

  return hourContainer;
}

//helper function that takes an element type and a class as strings and returns
//an element with the class
function domHelper(e, c) {
  if (!e) throw new Error("Element not defined");
  if (!c) throw new Error("Class not defined");

  const createElement = document.createElement(e);
  createElement.classList.add(c);

  return createElement;
}

//function to decide whether to display celsius or fahrenheit
function degreeDisplay(temp) {
  const degreeToggle = document.querySelector("#degree-toggle");
  if (degreeToggle.checked === false) {
    return getFahrenheit(temp);
  } else {
    return getCelsius(temp);
  }
}

//converts fahrenheit to celsius, rounds to one decimal place and then appends
//celsius symbol
function getCelsius(f) {
  let c = Number.parseFloat(((f - 32) * 5) / 9).toFixed(1);
  return c + "°C";
}

function getFahrenheit(f) {
  return f + "°F";
}
