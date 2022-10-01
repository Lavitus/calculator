const currentCalcDisplay = document.getElementById("currentCalc");
const lastResultDisplay = document.getElementById("lastResult");
const calcNumberButtons = document.getElementsByClassName("calcNum");
const calcEqualsButton = document.getElementById("calcEquals")
const calcOperatorButtons = document.querySelectorAll(".calcOperator")

for (let i = 0; i < calcNumberButtons.length; i++) {
    let btnNumValue = calcNumberButtons[i].textContent;
    calcNumberButtons[i].addEventListener("click", 
    function () {
        currentCalcDisplay.textContent += btnNumValue;
    })
};

for (let i = 0; i < calcOperatorButtons.length; i++) {
    let value = calcOperatorButtons[i].textContent;
    calcOperatorButtons[i].addEventListener("click", 
    function () {
        currentCalcDisplay.textContent += ` ${value} `;
    })
};

let lastResult = 0;
let displayValue = 0;

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

let a;
let b;
let op;

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
        } currentCalcDisplay.textContent = a;
})

function operate (a, op, b) {
    if (op === "+") return add(+a,+b);
    else if (op === "-") return subtract(+a,+b);
    else if (op === "x") return multiply(+a,+b);
    else if (op === "/") return divide(+a,+b);
}