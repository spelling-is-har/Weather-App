import "./styles.css";
import { safeCallApi } from "./api-call.js";
import { getCelsius, getFahrenheit } from "./degrees.js";
import { processData } from "./process-data.js";

document.querySelector("#location-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const location = document.querySelector("#location").value;
  safeCallApi(location)
    .then((data) => {
      console.log(data);
      //supplies an index of 0 to handleEvent because 0 is the default index of day (today)
      processData(data, 0);
    })
    .catch((e) => {
      console.log("Caught:", e);
    });
});

//adds toggle degree display event handler after the data has been retrieved from
const degreeToggle = document.querySelector("#degree-toggle");

degreeToggle.addEventListener("click", (event) => {
  const tempArr = document.querySelectorAll(".temp");
  if (degreeToggle.checked === true) {
    tempArr.forEach(
      (element) => (element.textContent = getCelsius(element.dataset.temp)),
    );
  } else {
    tempArr.forEach(
      (element) => (element.textContent = getFahrenheit(element.dataset.temp)),
    );
  }
});
