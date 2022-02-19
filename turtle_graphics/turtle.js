const ANGLE = {
  zero: 0,
  ninety: 90,
  oneEighty: 180,
  threeSixty: 360,
};

const DIRECTION = {
  west: "west",
  south: "south",
  east: "east",
  north: "north",
};
const MAX_X = 5;
const MAX_Y = 5;

const DEGREE_CHANGE = 90;

class Turtle {
  constructor(x, y) {
    if (x <= MAX_X) {
      this.x = x;
    }
    if (y <= MAX_Y) {
      this.y = y;
    }

    this.allPoints = [];
    this.allPoints.push([x, y]);
    this.direction = DIRECTION.west; // east, north, south;
    this.angle = ANGLE.zero; //90, 180, 360

    // set our grid to be 5 X 5
    this.max_X = MAX_X;
    this.max_Y = MAX_Y;



    // Padding down the Y axis
    // end result will be
    //  --------#
    //          #
    this.padDown(this.x, this.y);
  }
  // because we need to print the character at the end of the line
  // we need to decrease padLeft to one position
  // if we print the exact spaces for x, plus the character of y
  // the x position is +1 which is incorrect
  padLeft(x) {
    const LEFT = 0;
    const EMPTY_SPOT = `◯`;
    let horizontalLine = "";
    for (let i = LEFT; i < this.x - 1; i++) {
      horizontalLine += EMPTY_SPOT;
    }
     
    return horizontalLine;
  }

  padDown(x, y) {
    const TOP = 0;
    const EMPTY_SPOT = `◯`;
    const TURTLE = `◉`;
    const NEW_LINE = "\n";
    let verticalLine = "";
    let horizontalLine = this.padLeft(x);

    console.log(horizontalLine);
    for (let j = TOP; j < this.y; j++) {
      let line = horizontalLine + NEW_LINE;
      console.log(line);
      if ((j = this.y - 1)) {
        line = horizontalLine + TURTLE;
      }
      verticalLine += line;
      console.log(verticalLine);
    }
    //console.log(verticalLine);
    return verticalLine;
  }

  forward(x, y = 0) {
    this.allPoints.push([x, y]);
    return this;
  }

  left() {
    if (this.angle >= ANGLE.ninety) {
      this.angle = this.angle - DEGREE_CHANGE;
    }

    return this;
  }
  right() {
   
    if (this.angle === ANGLE.threeSixty) {
      this.angle = 0;
    }
    if (this.angle < ANGLE.threeSixty) {
      this.angle = this.angle + DEGREE_CHANGE;
    }
 
    return this;
  }

  print() {
    console.log("I have no idea how to make this work");

    const EMPTY_SPOT = `◯`;
    const X_SPACE = " ";
    const NEW_LINE = "\n";
    const TURTLE = `◉`;
    for (let arr of this.allPoints) {
      // we need to pad from left to right
      // because Y occupies one space, so we need to padd
      // x-1 spaces
      let horizontalLine = "";
      for (let x = 1; x < arr[0]; x++) {
        horizontalLine = this.padLeft(x);
      }
       
      let verticalLine = "";
      for (let y = 0; y < arr[1]; y++) {
        verticalLine += horizontalLine + this.padDown(y);
      }

      console.log(verticalLine);
    }
  }

  flashAllPoint() {
    console.log(this.allPoints);
  }
}

const t = new Turtle(3, 3);
//t.padLeft(this.x);
//t.padDown(this.x, this.y);
t.forward(3, 4).forward(4, 4).forward(4, 5).right().left().flashAllPoint();
//t.print();
