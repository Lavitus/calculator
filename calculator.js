const currentCalcDisplay = document.getElementById("currentCalc");
const lastResultDisplay = document.getElementById("lastResult");
const calcNumberButtons = document.getElementsByClassName("calcNum");
const calcEqualsButton = document.querySelector("#calcEquals")
const calcOperatorButtons = document.querySelectorAll(".calcOperator")
const calcClearButton = document.querySelector("#calcClear");

let calcInputArray;
let toggleOpVal = 1;
let toggleEqualVal = 1;

// add number to input & toggle operators on if off
for (let i = 0; i < calcNumberButtons.length; i++) {
    let btnNumValue = calcNumberButtons[i].textContent;
    calcNumberButtons[i].addEventListener("click", 
    function () {   
        numBtnClick(btnNumValue)
    })
};

function numBtnClick(btnNumValue) {
        calcInputArray = currentCalcDisplay.textContent.split(" ")
        if ((calcInputArray.length % 2) === 0) {
            currentCalcDisplay.textContent += ` ${btnNumValue}`;
        } else {
            currentCalcDisplay.textContent += `${btnNumValue}`;
        }    
        toggleOpBtn(1);
        toggleEqualBtn(1);
}

// add operator to input & toggle operators off
for (let i = 0; i < calcOperatorButtons.length; i++) {
    let value = calcOperatorButtons[i].textContent;
    calcOperatorButtons[i].addEventListener("click", 
    function(){
        operatorClick(value);
    })
};

function operatorClick(value) {
    if (toggleOpVal === 1) {    
        calcInputArray = currentCalcDisplay.textContent.split(" ");
        if (calcInputArray.slice(-1)[0].length >= 1 && (calcInputArray.length % 2) === 1) {
            currentCalcDisplay.textContent += ` ${value}`;
        } else if (((calcInputArray.length % 2) === 0) && value === "+" || value === "-") { 
            currentCalcDisplay.textContent += ` ${value}`;
            toggleOpBtn(0);
            toggleEqualBtn(0);
        } else if (value === "+" || value === "-") {
            currentCalcDisplay.textContent += `${value}`;
            toggleOpBtn(0);
            toggleEqualBtn(1);
        }
    }
}

// set operator buttons to off & on: (a === 1) toggles once on if off, (a === 0) just mainly to toggle off 
function toggleOpBtn(a) {
    if (a === 1 && toggleOpVal === 0 ) {
        toggleOpVal = 1;
    } else if (a === 0) {
        toggleOpVal = 0;
    }
} 

calcClearButton.addEventListener("click", 
function () {
    currentCalcDisplay.textContent = "";
    toggleOpBtn(1);
    toggleEqualBtn(1);
});

function toggleEqualBtn(a) {
    if (a === 1 && toggleEqualVal === 0) {
        toggleEqualVal = 1;
    } else if (a === 0) {
        toggleEqualVal = 0;
    }
}

let lastResult = 0;
let displayValue = 0;

let a;
let b;
let op;
// get and split input into array (pattern is: firstVal/sum, operator, secondVal) & calculate until end of array length
calcEqualsButton.addEventListener("click", 
function () {
    if (toggleEqualVal === 1) {  
        calcInputArray = currentCalcDisplay.textContent.split(" ");
        
        if ( calcInputArray.length >= 3) {
            a = operate(calcInputArray[0], calcInputArray[1], calcInputArray[2])
            
            if ( calcInputArray.length >= 4)    
                for (let i = 3; i < calcInputArray.length; i++) { 
                    if ((i % 2) === 1) {
                        op = calcInputArray[i];
                    } else {
                        b = calcInputArray[i];
                        a = operate(a, op, b);
                    }
                } 
                
            if (calcInputArray.length >= 4 && (calcInputArray.length % 2) === 0) { 
                currentCalcDisplay.textContent = `${a} ${op}`;
            } else {
                currentCalcDisplay.textContent = a;
            }
        }
    }
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
