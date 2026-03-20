export class DayWeather {
  constructor(data, day) {
    this.conditions = data.days[day].conditions;
    this.dateTime = data.days[day].datetime;
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

//function to extract the data needed from each hour of the day and returns an array of hours
function createHours(data, day) {
  const arr = [];
  //There are 24 hours in a day, so it loops 24 times
  for (let i = 0; i < 24; i++) {
    const hour = new Hour(data.days[day].hours[i]);
    arr.push(hour);
  }
  return arr;
}

class Hour {
  constructor(data) {
    this.dateTime = data.datetime;
    this.conditions = data.conditions;
    this.icon = data.icon;
    this.precipProb = data.precipprob;
    this.precipType = data.preciptype;
    this.temp = data.temp;
  }
}
