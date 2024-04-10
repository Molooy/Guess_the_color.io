var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");
var levels = [
    {name: "Easy", squares: 3},
    {name: "Hard", squares: 6},
    {name: "Super Hard", squares: 9}
];

init();

function init() {
    modeSetup();
    squareSetup();
    reset();
}


function modeSetup() {
    Array.from(modeButtons).forEach(mode => {
        mode.addEventListener('click', function() {
            Array.from(modeButtons).forEach(m => m.classList.remove('selected'));
            this.classList.add('selected');
            var levelFound = levels.find(level => level.name === this.textContent);
            if (!levelFound) throw Error(`Level ${this.textContent} not found`);
            numSquares = levelFound.squares;
            reset();
        });
    });
}

function squareSetup() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
            var clickedColor = this.style.background;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                h1.style.background = clickedColor;
                resetButton.textContent = "Play Again?"
            } else {
                this.style.background = "#24660547";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Game";
    messageDisplay.textContent = "";
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }

    h1.style.background = "steelblue";

}

resetButton.addEventListener("click", function() {
    reset();
});



function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}