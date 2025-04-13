/** Draws given matrix on the canvas.
 *   - Matrix should at least contains one element.
 *   - Matrix should be 2D.
 *   - Cell values should be valid CSS color strings.
 */
function drawMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const cellHeight = height / rows;
  const cellWidth = width / cols;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      noStroke();
      fill(matrix[i][j]);
      rect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
    }
  }
}

/** Creates the matrix with given dimensions.
 * Matrix will be filled with `value`
 */
function createMatrix(rows, cols, value) {
  return Array.from(Array(rows), () =>
    Array.from(new Array(cols), () => value)
  );
}

/* CONSTANTS */
const ROWS = 64;
const COLS = 64;

/* GLOBALS */
let matrix = createMatrix(ROWS, COLS, "white");
let antPosition = { r: ROWS / 2, c: COLS / 2, d: "N" };
let steps = 0;
let antInstructions = null;

/* SETUP FUNCTION */
function setup() {
  createCanvas(800, 800);
  frameRate(30);
  input = createFileInput(handleFile);
  input.position(0, 0);
}

function resetGame() {
  matrix = createMatrix(ROWS, COLS, "white");
  antPosition = { r: ROWS / 2, c: COLS / 2, d: "N" };
  steps = 0;
  antInstructions = null;
}

function handleFile(file) {
  if (file.type === "application" && file.subtype === "json") {
    resetGame();
    antInstructions = file.data;
  }
}

/* MAIN LOOP */
function draw() {
  if (
    antInstructions !== null &&
    antPosition.r < ROWS &&
    antPosition.r >= 0 &&
    antPosition.c < COLS &&
    antPosition.c >= 0
  ) {
    drawMatrix(matrix);
    const currentColor = matrix[antPosition.r][antPosition.c];
    const [instruction, nextColor] = antInstructions[currentColor];
    matrix[antPosition.r][antPosition.c] = nextColor;
    if (instruction === "left") {
      if (antPosition.d === "N")
        antPosition = { r: antPosition.r, c: antPosition.c - 1, d: "W" };
      else if (antPosition.d === "E")
        antPosition = { r: antPosition.r - 1, c: antPosition.c, d: "N" };
      else if (antPosition.d === "S")
        antPosition = { r: antPosition.r, c: antPosition.c + 1, d: "E" };
      else if (antPosition.d === "W")
        antPosition = { r: antPosition.r + 1, c: antPosition.c, d: "S" };
    } else if (instruction === "right") {
      if (antPosition.d === "N")
        antPosition = { r: antPosition.r, c: antPosition.c + 1, d: "E" };
      else if (antPosition.d === "E")
        antPosition = { r: antPosition.r + 1, c: antPosition.c, d: "S" };
      else if (antPosition.d === "S")
        antPosition = { r: antPosition.r, c: antPosition.c - 1, d: "W" };
      else if (antPosition.d === "W")
        antPosition = { r: antPosition.r - 1, c: antPosition.c, d: "N" };
    }
    steps++;
    textFont("Monospace");
    fill("black");
    text(`Step ${steps}`, 0, height - 5);
  }
}
