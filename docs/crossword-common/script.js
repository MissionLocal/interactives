
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
                currentRow = cellElement.id.split('-')[1];
                currentCol = cellElement.id.split('-')[2];
                updateSelected(row, col);
            });
        }

        //add in letters on keydown
        cellElement.addEventListener('input', handleInput);
        cellElement.addEventListener('keydown', handleInput);
        cellElement.addEventListener('paste', (event) => {
            event.preventDefault();
        });

        function handleInput(event) {
            //figure out cells next door
            cellToTheLeft = parseInt(currentCol) - 1
            cellToTheRight = parseInt(currentCol) + 1
            cellBelow = parseInt(currentRow) + 1
            cellAbove = parseInt(currentRow) - 1

            //LETTERS
            if ((event.inputType === 'insertText') || (event.inputType === 'insertCompositionText')) {
                const input = event.data.toUpperCase();
                if (/^[A-Z]$/.test(input)) {
                    selectedCell.value = "";
                    selectedCell.value = input;

                    if (focusDirection == "across" && currentCol < crosswordGrid[currentCol].length - 1 && crosswordGrid[currentRow][cellToTheRight] != "") {
                        //selectedCell.blur();
                        currentCol++;
                    }

                    if (focusDirection == "down" && currentRow < crosswordGrid[currentRow].length - 1 && crosswordGrid[cellBelow][currentCol] != "") {
                        //selectedCell.blur();
                        currentRow++;
                    }
                    updateSelected(currentRow, currentCol);
                } else {
                  selectedCell.value = "";
                }

            }

            //BACKSPACE
            else if (event.key === 'Backspace') {
                if (selectedCell.value == "") {
                    if (focusDirection == "across" && currentCol > 0 && crosswordGrid[currentRow][cellToTheLeft] != "") {
                        selectedCell.blur();
                        currentCol--;
                        updateSelected(currentRow, currentCol);
                    }
                    if (focusDirection == "down" && currentRow > 0 && crosswordGrid[cellAbove][currentCol] != "") {
                        selectedCell.blur();
                        currentRow--;
                        updateSelected(currentRow, currentCol);
                    }
                }
                selectedCell.value = "";
                answerValidation();
            }

            //ARROWS
            else if (event.key === 'ArrowUp' && currentRow > 0 && crosswordGrid[cellAbove][currentCol] != "") {
                event.preventDefault();
                currentRow--;
                updateSelected(currentRow, currentCol);
            } else if ((event.key === 'ArrowDown' && currentRow < crosswordGrid.length - 1 && crosswordGrid[cellBelow][currentCol] != "")) {
                event.preventDefault();
                currentRow++;
                updateSelected(currentRow, currentCol);
            } else if (event.key === 'ArrowLeft' && currentCol > 0 && crosswordGrid[currentRow][cellToTheLeft] != "") {
                event.preventDefault();
                currentCol--;
                updateSelected(currentRow, currentCol);
            } else if ((event.key === 'ArrowRight' && currentCol < crosswordGrid[currentRow].length - 1 && crosswordGrid[currentRow][cellToTheRight] != "")) {
                event.preventDefault();
                currentCol++;
                updateSelected(currentRow, currentCol);
            }

            //ENTER
            else if (event.key === 'Enter' && currentRow < crosswordGrid.length) {
                event.preventDefault();
                focusDirection = (focusDirection == "across") ? "down" : "across";
                updateSelected(currentRow, currentCol);
            }

            //TAB
            else if (event.key === 'Tab' || event.key === 'Next') {
                event.preventDefault();

                // Find the current index of the selected answer
                let currentIndex = -1;
                for (let i = 0; i < answers.length; i++) {
                    const answer = answers[i];
                    for (const cell of answer.cells) {
                        const cellElement = document.getElementById("cell-" + cell);
                        if (cellElement === selectedCell && answer.direction === focusDirection) {
                            currentIndex = i;
                            break;
                        }
                    }
                    if (currentIndex !== -1) {
                        break;
                    }
                }

                // Calculate the index of the next answer
                let nextIndex = currentIndex + 1;
                if (nextIndex >= answers.length) {
                    nextIndex = 0; // Loop back to the first index
                }

                // Update currentRow, currentCol, and focusDirection based on the next answer
                currentRow = answers[nextIndex].cells[0].split('-')[0];
                currentCol = answers[nextIndex].cells[0].split('-')[1];
                focusDirection = answers[nextIndex].direction;

                // Call updateSelected to update the UI
                updateSelected(currentRow, currentCol);
            }

        }
        rowElement.appendChild(cellElement);
    }
    crosswordContainer.appendChild(rowElement);
}

const cookieName = 'MissionLocalCrossword';
restoreProgress();

//update selected cell
function updateSelected(row, col) {
    if (selectedCell) {
        selectedCell.classList.remove('selected');
    }
    const cellElement = document.getElementById('cell-' + row + '-' + col);
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
    const newSize = containerWidth / gridSize;

    gridElements.forEach((element) => {
        if (newSize < 35) {
            element.style.width = newSize + 'px';
            element.style.height = newSize + 'px';
        } else {
            element.style.width = '35px';
            element.style.height = '35px';
        }
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
        if (newSize < 35) {
            supElement.style.left = (word.col * newSize + 4 + containerRect.left + clueBoxRect.left) + 'px';
            supElement.style.top = (word.row * newSize + 6 + clueBoxRect.height) + 'px';
        } else {
            supElement.style.left = (word.col * 35 + 4 + containerRect.left + clueBoxRect.left) + 'px';
            supElement.style.top = (word.row * 35 + 6 + clueBoxRect.height) + 'px';
        }

        supElement.classList.add('superscript');
        superscriptContainer.appendChild(supElement);
    }
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
