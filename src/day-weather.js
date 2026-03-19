export class DayWeather {
  constructor(data, day) {
    this.conditions = data.days[day].conditions;
    this.dateTime = data.days[day].datetime;
    this.description = data.days[day].description;
    this.hours = data.days[day].hours;
    this.icon = data.days[day].icon;
    this.precip = data.days[day].precip;
    this.precipType = data.days[day].precipType;
    this.temp = data.days[day].temp;
    this.tempMax = data.days[day].tempmax;
    this.tempMin = data.days[day].tempmin;
  }
}
