const currentCalcDisplay = document.getElementById("currentCalc");
const lastResultDisplay = document.getElementById("lastResult");
const calcNumberButtons = document.getElementsByClassName("calcNum");
const calcEqualsButton = document.getElementById("calcEquals")
const calcOperatorButtons = document.querySelectorAll(".calcOperator")

// add number to input & toggle operators on if off
for (let i = 0; i < calcNumberButtons.length; i++) {
    let btnNumValue = calcNumberButtons[i].textContent;
    calcNumberButtons[i].addEventListener("click", 
    function () {   
        currentCalcDisplay.textContent += `${btnNumValue}`;
        toggleOpCheck(1);
    })
};

// add operator to input & toggle operators off(positive/negate numbers calc & calc with fractions WiP)
for (let i = 0; i < calcOperatorButtons.length; i++) {
    let value = calcOperatorButtons[i].textContent;
    calcOperatorButtons[i].addEventListener("click", 
    function () {
        if (currentCalcDisplay.textContent.split(" ").slice(-1)[0].length >= 1 && (currentCalcDisplay.textContent.split(" ").length % 2) === 1) {
            currentCalcDisplay.textContent += ` ${value} `;
        } else if (value === "+" || value === "-") {
            currentCalcDisplay.textContent += `${value}`;
            toggleOpCheck(0);
        }
    })
};

let toggleOpVal;
// set operator buttons to off & on: (a === 1) toggles once on if off, (a === 0) just mainly to toggle off 
function toggleOpCheck(a) {
    if (a === 1 && toggleOpVal === 0 ) {
        toggleOp();
        toggleOpVal = 1;
    } else if (a === 0) {
        toggleOp();
        toggleOpVal = 0;
    }
} 

function toggleOp () {
    calcOperatorButtons.forEach( element => { element.toggleAttribute("disabled") });
}

let lastResult = 0;
let displayValue = 0;

let a;
let b;
let op;
// get and split input into array (pattern is: firstVal/sum, operator, secondVal) & calculate until end of array length
document.getElementById("calcEquals").addEventListener("click", 
function () {
    let calcInputValue = currentCalcDisplay.textContent.split(" ");
    a = operate(calcInputValue[0], calcInputValue[1], calcInputValue[2])
    if ( calcInputValue.length >= 5 && (calcInputValue.length % 2) === 1)    
        for (let i = 3; i < calcInputValue.length; i++) { 
            if ((i % 2) === 1) {
                op = calcInputValue[i];
            } else {
                b = calcInputValue[i];
                a = operate(a, op , b);
            }
        } 
        currentCalcDisplay.textContent = a;
})

// check operator and then calculate 
function operate (a, op, b) {
    if (op === "+") return add(+a,+b);
    else if (op === "-") return subtract(+a,+b);
    else if (op === "x") return multiply(+a,+b);
    else if (op === "÷") return divide(+a,+b);
}

// calc formula
function add (a,b) {
    return a + b;
}

function subtract (a,b) {
    return a - b;
}

function multiply (a,b) {
    return a * b;
}

function divide (a,b) {
    return a / b; 
}
