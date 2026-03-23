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
    this.tempMax = data.days[day].tempmax;
    this.tempMin = data.days[day].tempmin;
    this.hours = createHours(data, day);
  }
}

class Hour {
  constructor(data, time) {
    console.log(data, time);
    // this.time = toTwentyFour(time);
    this.time = cleanTime(data.datetime);
    this.conditions = data.conditions;
    this.icon = data.icon;
    this.precipProb = data.precipprob;
    this.precipType = data.preciptype;
    this.temp = data.temp;
  }
}

function cleanTime(time) {
  return time.slice(0, 5);
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
  //Loops over the length of the hours array. This is NOT set to 24 to account for any possible
  //daylight savings
  for (let i = 0; i < data.days[day].hours.length; i++) {
    const hour = new Hour(data.days[day].hours[i], i);
    arr.push(hour);
  }
  return arr;
}
