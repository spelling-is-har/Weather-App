import { handleError } from "./error";

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
  temp.textContent = data.temp;
}

export function displayWeek(data) {
  const weekContainer = document.querySelector(".week-container");
  //clears weeksContainer for update
  weekContainer.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    const dayContainer = createDay(data[i]);
    weekContainer.append(dayContainer);
  }

  return weekContainer;
}

function createDay(data) {
  const container = domHelper("div", "day-container");

  const icon = domHelper("p", "icon");
  icon.textContent = data.icon;

  const day = domHelper("p", "day");
  day.textContent = data.day;

  const date = domHelper("p", "date");
  date.textContent = data.dateTime;

  const tempMin = domHelper("p", "temp-min");
  tempMin.textContent = data.tempMin;

  const tempMax = domHelper("p", "temp-min");
  tempMax.textContent = data.tempMax;

  container.append(day, date, icon, tempMax, tempMin);

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
  console.log("Try this");
  console.log(data);
  const hourContainer = domHelper("div", "hour-container");

  const icon = domHelper("p", "icon");
  icon.textContent = data.icon;

  const time = domHelper("p", "time");
  time.textContent = data.time.toString();

  const temp = domHelper("p", "temp");
  temp.textContent = data.temp;

  hourContainer.append(time, icon, temp);

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

const loadImage = async (data) => {
  const module = await import(`./images/${data.icon}.png`);
  return module.default;
};

const safeLoadImage = handleError(loadImage);
