export function getCelsius(f) {
  let c = Number.parseFloat(((f - 32) * 5) / 9).toFixed(1);
  return c + "°C";
}

export function getFahrenheit(f) {
  return f + "°F";
}

//function to decide whether to display celsius or fahrenheit
export function degreeDisplay(temp) {
  const degreeToggle = document.querySelector("#degree-toggle");
  if (degreeToggle.checked === false) {
    return getFahrenheit(temp);
  } else {
    return getCelsius(temp);
  }
}
