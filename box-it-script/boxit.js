const isNumeric = (num) => {
  if (
    isNaN(num) ||
    num === undefined ||
    num === null ||
    typeof num === "string"
  ) {
    return false; // how should we handle a non-numeric value when a draw function is called?
  }
  return true;
};

/**
 * Computes the longest string length from an input-array of strings:
 *
 *   return a numeric value of the longest string
 */
const calculateMaxLength = (arr) => {
  if (typeof arr === "object" && Array.isArray(arr) && arr.length > 0) {
    return Math.max(...arr.map((str) => str.length));
  }
  return 0; //how should we handle an object of objects?
};

// // This is our box width
// const MAX_LENGTH = calculateMaxLength(inputArr) + 1;

/**
 *
 * startCharacter: the character appears on the left
 * endCharacter: the character appears on the right
 * middleCharacter: the character used to built the line
 * lenght: how long the line is *
 *
 * return a line with startCharacter, middleCharacter, endCharacter
 */
const buildLine = (startCharacter, middleCharacter, endCharacter, length) => {
  if (!isNumeric(length)) return;

  let line = "";
  let middleOfLine = "";

  if (isNumeric(length) && length > 0) {
    for (let i = 0; i < length; i++) {
      middleOfLine = middleOfLine + middleCharacter;
    }
  }
  line = startCharacter + middleOfLine + endCharacter; // *   -  * 5
  return line;
};

const boxIt = (arr) => {};

/**
 * Draw a line using one single character: --------
 *
 * return a string (line) of character
 *
 * the with is specified by the input length
 */
const drawLine = (length) => {
  const SPACE_BAR = "\u2500";

  if (length === 0) return "";

  return buildLine(SPACE_BAR, SPACE_BAR, SPACE_BAR, length);
};

/**
 * Draw a line using 3 different characters:
 *
 * return a string (line) of left character, middle character and right character
 *
 * the with is specified by the input length
 */
const drawTopBorder = (length) => {
  const LEFT_BAR = "\u250C";
  const RIGHT_BAR = "\u2510";
  const MIDDLE_BAR = "\u2500";

  if (length === 0) {
    return LEFT_BAR + MIDDLE_BAR + RIGHT_BAR;
  }

  if (isNumeric(length)) {
    return buildLine(LEFT_BAR, MIDDLE_BAR, RIGHT_BAR, length);
  }
};

const drawMiddleBorder = (length) => {
  const LEFT_BAR = "\u251C";
  const RIGHT_BAR = "\u2524";
  const MIDDLE_BAR = "\u2500";

  if (length === 0) {
    return LEFT_BAR + MIDDLE_BAR + RIGHT_BAR;
  }

  if (isNumeric(length)) {
    return buildLine(LEFT_BAR, MIDDLE_BAR, RIGHT_BAR, length);
  }
};

const drawBottomBorder = (length) => {
  const LEFT_BAR = "\u2514";
  const RIGHT_BAR = "\u2518";
  const MIDDLE_BAR = "\u2500";

  if (length === 0) {
    return LEFT_BAR + MIDDLE_BAR + RIGHT_BAR;
  }

  if (isNumeric(length)) {
    return buildLine(LEFT_BAR, MIDDLE_BAR, RIGHT_BAR, length);
  }
};

const drawBarsAround = (str) => {
  const LEFT_BAR = "\u251C";
  const RIGHT_BAR = "\u2524";
  let MIDDLE_BAR = str;

  const LENGTH = 1; // We only want to display the str once

  return buildLine(LEFT_BAR, MIDDLE_BAR, RIGHT_BAR, LENGTH);
};

const buildInputArr = (arr) => {
  const inputArr = [];
  const isCSV = false;
  if (process.argv.length < 3) {    
    return [];
  }

  if (process.argv.length === 3) {
    const [filename, extension] = process.argv[2].split(".");
    if (extension === "csv") {
      isCSV = true;
    }
  }

  if (process.argv.length >= 3 && !isCSV) {
    for (let index = 2; index < process.argv.length; index++) {
      inputArr.push(process.argv[index]);
    }
  }
  return inputArr;
}

const boxit = () => {
  let inputArr = [];
  let isCSV = false;
  inputArr = buildInputArr(process.argv);

  // This is our box width
  const MAX_LENGTH = calculateMaxLength(inputArr) + 1;

  let line = "";
  let topLine = "";
  let bottomLine = "";

  // draw empty box
  if (inputArr.length === 0) {
    topLine = drawTopBorder(0);
    bottomLine = drawBottomBorder(0);
    line = topLine + "\n\n" + bottomLine;
  }

  // draw top border
  // draw all the string in between, plus the seperator
  // then draw the bottom border
  if (inputArr.length > 0) {
    topLine = drawTopBorder(MAX_LENGTH);
    line = line + topLine;
    line = line + "\n\n";

    for (let index = 0; index < inputArr.length; index++) {
      line = line + drawBarsAround(inputArr[index]) + "\n";
      if (index !== inputArr.length - 1) {
        line = line + drawMiddleBorder(MAX_LENGTH) + "\n";
      }
    }
    bottomLine = drawBottomBorder(MAX_LENGTH);
    line = "\n" + line + bottomLine;
  }

  return line;
};

 
console.log(boxit());
