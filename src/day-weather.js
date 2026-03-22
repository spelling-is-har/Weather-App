export class DayWeather {
  constructor(data, day) {
    this.conditions = data.days[day].conditions;
    this.dateTime = data.days[day].datetime;
    this.day = getDayOfWeek(data.days[day]);
    this.description = data.days[day].description;
    this.icon = data.days[day].icon;
    this.precip = data.days[day].precip;
    this.precipType = data.days[day].precipType;
    this.temp = data.days[day].temp;
    this.celsius = getCelsius(this.temp);
    this.fahrenheit = getFahrenheit(this.temp);
    this.tempMax = data.days[day].tempmax;
    this.tempMin = data.days[day].tempmin;
    this.celsiusMax = getCelsius(this.tempMax);
    this.celsiusMin = getCelsius(this.tempMin);
    this.fahrenheitMax = getFahrenheit(this.tempMax);
    this.fahrenheitMin = getFahrenheit(this.tempMin);
    this.hours = createHours(data, day);
  }
}

class Hour {
  constructor(data, time) {
    this.time = toTwentyFour(time);
    this.conditions = data.conditions;
    this.icon = data.icon;
    this.precipProb = data.precipprob;
    this.precipType = data.preciptype;
    this.temp = data.temp;
    this.celsius = getCelsius(this.temp);
    this.fahrenheit = getFahrenheit(this.temp);
  }
}

//function that translates time number in to string in 24hr format
function toTwentyFour(time) {
  time = Number(time);

  if (time <= 9) {
    return "0" + time.toString() + ":00";
  } else {
    return time.toString() + ":00";
  }
}

//function that returns the day of the week depending on the date object
function getDayOfWeek(data) {
  const date = new Date(data.datetime);

  const weekArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return weekArr[date.getDay()];
}

//function to extract the data needed from each hour of the day and returns an array of hours
function createHours(data, day) {
  const arr = [];
  //There are 24 hours in a day, so it loops 24 times
  for (let i = 0; i < 24; i++) {
    const hour = new Hour(data.days[day].hours[i], i);
    arr.push(hour);
  }
  return arr;
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
