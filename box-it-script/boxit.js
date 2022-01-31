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
  line = startCharacter + middleOfLine + endCharacter;
  return line;
};

const boxIt = (arr) => {};

/**
 * Draw a line using one single character:
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
  const LENGTH = 1; // We only one to display the str once

  //const extraSpaceForPadding = appendSpaceToLine(MAX_LENGTH - str.length);
  //MIDDLE_BAR = MIDDLE_BAR + extraSpaceForPadding;

  let line = "";

  return buildLine(LEFT_BAR, MIDDLE_BAR, RIGHT_BAR, LENGTH);
};

console.log(drawTopBorder(20));
console.log();
console.log(drawBarsAround(' Rafa  '));
console.log();
console.log(drawMiddleBorder(20));
console.log();
console.log(drawBottomBorder(20));
//console.log(drawLine(0));
