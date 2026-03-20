//Global variable for the API key
const API_KEY = "D22DDZSZ8J58JTVVUXHMVT3PX";

// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=D22DDZSZ8J58JTVVUXHMVT3PX

export const callApi = async (location) => {
  const response = await fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
      location +
      "?key=" +
      API_KEY,
  );
  return response.json();
};
