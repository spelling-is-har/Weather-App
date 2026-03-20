export function updateCurrent(data) {
  if (!data) throw new Error("Data undefined");

  const location = document.querySelector(".location-display");
  location.textContent = data.address;

  const icon = document.querySelector(".current-icon");
  icon.textContent = data.icon;

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

  const date = domHelper("p", "date");
  date.textContent = data.dateTime;

  const tempMin = domHelper("p", "temp-min");
  tempMin.textContent = data.tempMin;

  const tempMax = domHelper("p", "temp-min");
  tempMax.textContent = data.tempMax;

  container.append(date, icon, tempMax, tempMin);

  return container;
}

export function displayHours(data) {
  const hoursContainer = document.querySelector(".hours-container");

  for (let i = 0; i < 24; i++) {
    const hour = createHour(data);
    hoursContainer.append(hour);
  }
}

function createHour(data) {
  const hourContainer = domHelper("div", "hour-container");

  const icon = domHelper("p", "icon");
  icon.textContent = data.icon;

  const date = domHelper("p", "date");
  date.textContent = data.dateTime;

  const temp = domHelper("p", "temp");
  temp.textContent = data.temp;

  hourContainer.append(icon, date, temp);

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
