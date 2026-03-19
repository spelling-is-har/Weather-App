export class CurrentWeather {
  constructor(data) {
    this.conditions = data.currentConditions.conditions;
    this.description = data.description;
    this.icon = data.currentConditions.icon;
    this.precipProb = data.currentConditions.precipprob;
    this.precipType = data.currentConditions.preciptype;
    this.temp = data.currentConditions.temp;
  }
}
