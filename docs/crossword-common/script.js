
var pymChild = new pym.Child();

//set variables
const crosswordContainer = document.querySelector('.crossword-container');

let selectedCell = null;
let currentRow = 0;
let currentCol = 0;
let focusDirection = "across";
let cluesColumnHighlight = "";

//create crossword
for (let row = 0; row < crosswordGrid.length; row++) {
    const rowElement = document.createElement('div');
    rowElement.className = 'crossword-row';

    for (let col = 0; col < crosswordGrid[row].length; col++) {
        var letter = crosswordGrid[row][col];

        const cellElement = document.createElement('input');
        cellElement.className = 'crossword-cell';
        cellElement.inputMode = 'search';
        cellElement.id = 'cell-' + row + '-' + col;
        cellElement.tabIndex = 0;

        //make black squares
        if (letter == "") {
            cellElement.classList.add('empty');
            cellElement.classList.remove('crossword-cell');
        }

        //select squares
        if (letter != "") {
            cellElement.addEventListener('click', () => {
                //figure out if clicking already selected square
                previousSelection = document.getElementsByClassName('selected')[0];
                if (previousSelection != null) {
                    if (previousSelection.id == cellElement.id) {
                        focusDirection = (focusDirection == "across") ? "down" : "across";
                    }
                }
                currentRow = parseInt(cellElement.id.split('-')[1]);
                currentCol = parseInt(cellElement.id.split('-')[2]);
                updateSelected();
            });
        }

        //add in letters on keydown
        cellElement.addEventListener('input', handleInput);
        cellElement.addEventListener('keydown', handleInput);
        cellElement.addEventListener('paste', (event) => {
            event.preventDefault();
        });

        function handleInput(event) {
            // consts for nextOrPrevBlank() and nextOrPrevSquare()
            const NEXT = true;
            const PREV = false;

            //LETTERS
            if ((event.inputType === 'insertText') || (event.inputType === 'insertCompositionText')) {
                const input = event.data.toUpperCase();
                if (/^[A-Z]$/.test(input)) {
                    selectedCell.value = "";
                    selectedCell.value = input;

                    let oldSelectedCell = selectedCell;
                    nextOrPrevBlank(NEXT);
                    if (oldSelectedCell == selectedCell) {
                        // This only happens if the puzzle is completely filled, advance one square
                        nextOrPrevSquare(NEXT, focusDirection);
                    }
                } else {
                  selectedCell.value = "";
                }
            }

            //BACKSPACE
            else if (event.key === 'Backspace') {
                if (selectedCell.value == "") {
                    nextOrPrevSquare(PREV, focusDirection);
                }
                selectedCell.value = "";
                answerValidation();
            }

            //ARROWS
            else if (event.key === 'ArrowUp') {
                event.preventDefault();
                nextOrPrevSquare(PREV, "down");
            } else if (event.key === 'ArrowDown') {
                event.preventDefault();
                nextOrPrevSquare(NEXT, "down");
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                nextOrPrevSquare(PREV, "across");
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                nextOrPrevSquare(NEXT, "across");
            }

            //ENTER
            else if (event.key === 'Enter' && currentRow < crosswordGrid.length) {
                event.preventDefault();
                focusDirection = (focusDirection == "across") ? "down" : "across";
                updateSelected();
            }

            //TAB
            else if (event.key === 'Tab' || event.key === 'Next') {
                event.preventDefault();

                // advance to the next answer
                index = getCurrentAnswer().index;
                index++;
                if (index == answers.length) {
                    index = 0;
                }
                var answer = answers[index];
                cell = answer.cells[0];
                currentRow = parseInt(cell.split('-')[0]);
                currentCol = parseInt(cell.split('-')[1]);
                focusDirection = answer.direction;
                updateSelected();

                // now find the next blank (could be current cell)
                nextOrPrevBlank(NEXT);
            }
        }
        rowElement.appendChild(cellElement);
    }
    crosswordContainer.appendChild(rowElement);
}

const cookieName = 'MissionLocalCrossword';
restoreProgress();

//update selected cell
function updateSelected() {
    if (selectedCell) {
        selectedCell.classList.remove('selected');
    }
    const cellElement = document.getElementById('cell-' + currentRow + '-' + currentCol);
    selectedCell = cellElement;
    selectedCell.classList.add('selected');
    selectedCell.focus();
    highlightAnswerCells();
    pymChild.sendHeight();
    saveProgress();
}

function highlightAnswerCells() {
    document.getElementById('highlight-clue-text').innerHTML = "";

    //highlight answer cells
    let selectedWords = []
    for (var answer of answers) {
        for (var cell of answer.cells) {
            let cellElement = document.getElementById("cell-" + cell);
            if (cellElement === selectedCell) {
                selectedWords.push(answer.word)
            }
            cellElement.classList.remove('blue_highlight');
        }
    }

    for (var answer of answers) {
        if (selectedWords.includes(answer.word)) {
            for (var cell of answer.cells) {
                if (answer.direction == focusDirection) {
                    let cellElement = document.getElementById("cell-" + cell);
                    cellElement.classList.add('blue_highlight');
                }
            }
        }
    }

    //put current clues at the top of the page
    for (var answer of answers) {
        if (selectedWords.includes(answer.word)) {
            if (answer.direction == 'across' && focusDirection == 'across') {
                var clueLabel = "<strong>" + answer.number + " Across</strong> "
                var clue = answer.clue;
                var currentAnswer = answer;
            }
            if (answer.direction == 'down' && focusDirection == 'down') {
                var clueLabel = "<strong>" + answer.number + " Down</strong> "
                var clue = answer.clue;
                var currentAnswer = answer;
            }
            document.getElementById('highlight-clue-label').innerHTML = clueLabel;
            document.getElementById('highlight-clue-text').innerHTML = clue;
        }
    }

    //highlight clue in clues column
    if (cluesColumnHighlight) {
      cluesColumnHighlight.classList.remove('clues-list-highlight')
    }

    cluesColumnHighlight = document.getElementById(currentAnswer.number + "-" + currentAnswer.direction)
    cluesColumnHighlight.classList.add('clues-list-highlight');

    setGridElementSize();
}

//change size depending on screen size
const container = document.querySelector('.container');
const gridElements = document.querySelectorAll('.crossword-cell, .empty');
var clueHighlight = document.querySelector('.clue-highlight');

function setGridElementSize() {
    const containerWidth = container.offsetWidth;
    const gridSize = 15;
    const newSize = Math.min(containerWidth / gridSize, 35);

    gridElements.forEach((element) => {
        element.style.width = newSize + 'px';
        element.style.height = newSize + 'px';
    });

    //add superscript numbers over the top of the grid container
    const superscriptContainer = document.querySelector('.superscript-container');
    superscriptContainer.innerHTML = '';

    const containerRect = container.getBoundingClientRect();
    var clueBoxRect = clueHighlight.getBoundingClientRect();

    for (const word of wordStarts) {
        const supElement = document.createElement('sup');
        supElement.textContent = word.number;

        //calculate the left and top positions relative to the container
        supElement.style.left = (word.col * newSize + 4 + containerRect.left + clueBoxRect.left) + 'px';
        supElement.style.top = (word.row * newSize + 6 + clueBoxRect.height) + 'px';

        supElement.classList.add('superscript');
        superscriptContainer.appendChild(supElement);
    }
}

// Return: answer the selectedCell is pointing to
function getCurrentAnswer() {
    for (answer of answers) {
        if (answer.direction != focusDirection) {
            continue;
        }
        for (const cell of answer.cells) {
            if (selectedCell.id === "cell-" + cell) {
                return answer;
            }
        }
    }
}

// Go to the first unfilled square in this answer or the next answers
// nextOrPrev - true go to next, false go to previous
function nextOrPrevBlank(nextNotPrev) {
    // which way to go
    var increment = nextNotPrev ? 1 : -1;
    // where is the end of the answers list
    var sentinel = nextNotPrev ? answers.length : -1;
    // where do we go when we hit the end
    var wrapVal = nextNotPrev ? 0 : answers.length - 1;

    let answer = getCurrentAnswer();
    const startAnswer = answer.index;
    let answerIndex = startAnswer;

    let cells = answer.cells;
    let startCell;
    for (let index = 0; index < cells.length; index++) {
        if (selectedCell === document.getElementById('cell-' + cells[index])) {
            startCell = index;
            break;
        }
    }

    do {
        let index = startCell;
        do {
            let cell = cells[index];
            const cellElement = document.getElementById('cell-' + cell);
            if (cellElement.value == "") {
                currentRow = parseInt(cell.split('-')[0]);
                currentCol = parseInt(cell.split('-')[1]);
                focusDirection = answer.direction;

                updateSelected();
                return;
            }

            index++;
            if (index == cells.length) {
                index = 0;
            }
        } while (index != startCell);

        answerIndex += increment;
        if (answerIndex === sentinel) {
            answerIndex = wrapVal;
        }

        answer = answers[answerIndex];
        cells = answer.cells;
        startCell = 0;
    } while (answerIndex != startAnswer);
}

// Go to the next or previous non-black cell
// nextOrPrev - true go to next, false go to previous
// direction - "across" or "down"
function nextOrPrevSquare(nextNotPrev, direction) {
    var increment;
    var colOnWrap;
    var colSentinel;
    var rowOnWrap;
    var rowSentinel;
    if (nextNotPrev) {
        increment = 1;
        colOnWrap = 0;
        colSentinel = crosswordGrid[0].length;
        rowOnWrap = 0;
        rowSentinel = crosswordGrid.length;
    } else {
        increment = -1;
        colOnWrap = crosswordGrid[0].length - 1;
        colSentinel = -1;
        rowOnWrap = crosswordGrid.length - 1;
        rowSentinel = -1;
    }

    // keep going until we get to a non-black square
    do {
        if (direction === "across") {
            currentCol += increment;
            if (currentCol == colSentinel) {
                currentCol = colOnWrap;
                currentRow += increment;
                if (currentRow == rowSentinel) {
                    currentRow = rowOnWrap;
                }
            }
        } else {
            currentRow += increment;
            if (currentRow == rowSentinel) {
                currentRow = rowOnWrap;
                currentCol += increment;
                if (currentCol == colSentinel) {
                    currentCol = colOnWrap;
                }
            }
        }
    } while (crosswordGrid[currentRow][currentCol] == "");
    updateSelected();
}

function answerValidation() {
    //remove correct if not correct
    crosswordCells = document.getElementsByClassName('crossword-cell');
    for (var i = 0; i < crosswordCells.length; i++) {
        var cell = crosswordCells[i];
        if (cell.classList.contains('correct')) {
            cell.classList.remove('correct');
        }
    }

    //see if the user values grid matches the answer grid
    newGrid = [];
    for (let row = 0; row < crosswordGrid.length; row++) {
        newRow = [];
        for (let col = 0; col < crosswordGrid[row].length; col++) {
            const cellElement = document.getElementById('cell-' + row + '-' + col);
            newRow.push(cellElement.value)
        }
        newGrid.push(newRow)
    }
    var flattenedNewGrid = [].concat(...newGrid).join('-');
    var flattenedCrosswordGrid = [].concat(...crosswordGrid).join('-');

    if (flattenedNewGrid == flattenedCrosswordGrid) {
        for (var i = 0; i < crosswordCells.length; i++) {
            var cell = crosswordCells[i];
            cell.classList.add('correct');
        }
    }
}

function saveProgress() {
    var saveString = "";
    for (let row = 0; row < crosswordGrid.length; row++) {
        for (let col = 0; col < crosswordGrid[row].length; col++) {
            var cell = document.getElementById('cell-' + row + '-' + col);
            if (cell.classList.contains('empty')) {
                continue;
            }
            if (cell.value === "") {
                saveString += '-';
            } else {
                saveString += cell.value;
            }
        }
    }
    document.cookie = cookieName + '=' + saveString + "; SameSite=None; Secure";
}

function restoreProgress() {
    var cookies = document.cookie.split(';');
    for (var cookie of cookies) {
        if (cookie.indexOf(cookieName) != 0) {
            continue;
        }

        // +1 to skip over '='
        var saveString = cookie.substring(cookieName.length + 1);
        var i = 0;
        for (let row = 0; row < crosswordGrid.length; row++) {
            for (let col = 0; col < crosswordGrid[row].length; col++) {
                var cell = document.getElementById('cell-' + row + '-' + col);
                if (cell.classList.contains('empty')) {
                    continue;
                }

                letter = saveString[i];
                i++;
                if (letter == '-') {
                    continue;
                }

                cell.value = letter;
            }
        }
    }
}

//create clue list
var allAcrossClues = [];
var allDownClues = [];
acrossClues = document.getElementById('across-clues');
downClues = document.getElementById('down-clues');

allAcrossClues.push("<ol class='custom-list'>")
allDownClues.push("<ol class='custom-list'>")

for (var answer of answers) {
    if (answer.direction == 'across') {
        allAcrossClues.push("<li class='clue-list' id='" + answer.number + "-" + answer.direction + "'><span class='clue-label'>" + answer.number + "</span><span class='clue-text'>" + answer.clue + "</span></li>");
    }
    if (answer.direction == 'down') {
        allDownClues.push("<li class='clue-list' id='" + answer.number + "-" + answer.direction + "'><span class='clue-label'>" + answer.number + "</span><span class='clue-text'>" + answer.clue + "</span></li>");
    }
}

allAcrossClues.push("</ol>")
allDownClues.push("</ol>")

acrossClues.innerHTML = allAcrossClues.join('');
downClues.innerHTML = allDownClues.join('');

//call answerValidation whenever user inputs change
gridElements.forEach((element) => {
    element.addEventListener('input', answerValidation);
});

//create everything
setGridElementSize();
window.addEventListener('resize', setGridElementSize);
pymChild.sendHeight();
