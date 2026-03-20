//function that adds error handling to API calls
export function handleError(fn) {
  return function (...params) {
    return fn(...params).catch(function (err) {
      throw new Error("Error in API call: ", err);
      // console.log("Error in API call:", err);
    });
  };
}
