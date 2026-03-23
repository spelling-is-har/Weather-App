class DisplayState {
  constructor() {
    this.degreeType = "";
  }

  //gets the degree type
  get getDegreeType() {
    return this.degreeType;
  }

  //sets the degree type
  set setDegreeType(degree) {
    console.log(degree);
    if (degree === "celsius" || degree === "fahrenheit") {
      this.degreeType = degree;
      return;
    }
    throw new Error("Not celsius or fahrenheit");
  }
}

export const displayState = new DisplayState();
