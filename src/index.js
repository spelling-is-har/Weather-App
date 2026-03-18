import "./styles.css";

const API_KEY = "D22DDZSZ8J58JTVVUXHMVT3PX";

// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=D22DDZSZ8J58JTVVUXHMVT3PX

async function callApi(location) {
  const response = await fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
      location +
      "?key=" +
      API_KEY,
  );
  return response.json();
}
callApi("paris").then((data) => {
  console.log(data);
});
