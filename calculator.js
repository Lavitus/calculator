const currentCalcDisplay = document.getElementById("currentCalc");
const lastResultDisplay = document.getElementById("lastResult");
const calcNumberButtons = document.getElementsByClassName("calcNum");
const calcEqualsButton = document.querySelector("#calcEquals")
const calcOperatorButtons = document.querySelectorAll(".calcOperator")
const calcClearButton = document.querySelector("#calcClear");
const calcDelButton = document.getElementById("calcDel");

let calcInputArray;
let toggleOpVal = 1;
let toggleEqualVal = 1;
let displayType = "input";
let operatorKeys = ["+","-","/","*"];

currentCalcDisplay.addEventListener("keydown", 
function(e) {
        if (e.key <= 9) { 
            numBtnClick(e.key)
        } else if (operatorKeys.includes(e.key) === true ) {
            operatorClick(e.key);
        } else if (e.key === "Backspace") {
            delInput();
        }
})

currentCalcDisplay.addEventListener("click", () => {
    currentCalcDisplay.focus()
});

calcDelButton.addEventListener("click", () => {
    delInput();
});
// delete single number digits and operators
function delInput() {
    if (displayType === "input") {   
        if ((currentCalcDisplay.textContent.slice(-2).replace(/ .$/, '') === "")) {
            currentCalcDisplay.textContent = currentCalcDisplay.textContent.replace(/ .$/, '');
            toggleOpBtn(1);
        } else {
            currentCalcDisplay.textContent = currentCalcDisplay.textContent.slice(0, -1);
        }
    }
}

// add number to input & toggle operators on if off
for (let i = 0; i < calcNumberButtons.length; i++) {
    let btnNumValue = calcNumberButtons[i].textContent;
    calcNumberButtons[i].addEventListener("click", 
    function() {   
        numBtnClick(btnNumValue)
    })
};

function numBtnClick(btnNumValue) {
    if (displayType === "input") {   
        calcInputArray = currentCalcDisplay.textContent.split(" ")
        if ((calcInputArray.length % 2) === 0) {
            currentCalcDisplay.textContent += ` ${btnNumValue}`;
        } else {
            currentCalcDisplay.textContent += `${btnNumValue}`;
        }    
        toggleOpBtn(1);
        toggleEqualBtn(1);
    } else {
        clearInput();
        numBtnClick(btnNumValue);
    }
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
    if (toggleOpVal === 1 && displayType === "input") {    
        calcInputArray = currentCalcDisplay.textContent.split(" ");
        if (calcInputArray.slice(-1)[0].length >= 1 && (calcInputArray.length % 2) === 1) {
            if (value === "/") value = "÷";
            else if (value === "*") value = "x";
            currentCalcDisplay.textContent += ` ${value}`;
        } else if (((calcInputArray.length % 2) === 0) && value === "-") { 
            currentCalcDisplay.textContent += ` ${value}`;
            toggleOpBtn(0);
            toggleEqualBtn(0);
        } else if ((calcInputArray.length === 0) && value === "+" || value === "-") {
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
// listener for clear button, reset everything
calcClearButton.addEventListener("click", 
function () {
    clearInput();
    toggleOpBtn(1);
    toggleEqualBtn(1);
});

// clears input & sets display to number 
function clearInput() {
    currentCalcDisplay.textContent = "";
    displayType = "input";
}

// toggles the function to get results, (toggleEqualVal 1 = enabled / 0 = disabled)
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
let calcRuleArray = [];
let calcRuleCond = ["÷","x"]

// get and split input into array (pattern is: firstVal/sum, operator, secondVal) & calculate until end of array length
calcEqualsButton.addEventListener("click", 
function () {
    if (toggleEqualVal === 1 && displayType === "input") {  
        currentCalcDisplay.textContent = parseInput(currentCalcDisplay.textContent)
        calcInputArray = currentCalcDisplay.textContent.split(" ");
        if ( calcInputArray.length >= 3) {    
            if (calcRuleCond.some(i => calcInputArray.includes(i)) === true) {
                calcInputArray.forEach((element, index) => {
                    if(calcRuleCond.includes(element)){
                        calcRuleArray.push(index);
                    }
                })
                calcRuleArray.forEach((calcIdx, index) => {
                    op = calcInputArray[calcIdx]
                    a = calcInputArray[calcIdx-1]
                    b = calcInputArray[calcIdx+1]
                    if (b == 0 && op === "÷") return error();
                    else if (b === undefined) return calcRuleArray.pop();
                    a = operate(a, op, b)
                    calcInputArray.splice(calcIdx+1, 1, a)
                })
                calcRuleArray.reverse().forEach((calcIdx, index) => {
                    calcInputArray.splice(calcIdx-1,2);
                })
                calcRuleArray = [];
            }
        } else {
            return;
        }

        if ( calcInputArray.length >= 3 && displayType === "input") {
            a = calcInputArray[0];
            for (let i = 1; i < calcInputArray.length; i++) { 
                if ((i % 2) === 1) {
                        op = calcInputArray[i];
                } else {
                        b = calcInputArray[i];
                        if (b == 0 && op === "÷") return error();
                        a = operate(a, op, b);
                }
            } 
        } else if (displayType === "errorText") {
            return;
        } else {
            a = calcInputArray[0];
            op = calcInputArray[1];
        }
        a = formatter.format(a);
            
        displayResults(calcInputArray) 
    }
})
// removes comma for calculations
function parseInput(input) {
    return input.replace(/,/g, '')
  }

// displays error text if calculation divides by 0
function error() {
    currentCalcDisplay.textContent = "You divided by 0! That's infinity!";
    displayType = "errorText";
}

// displays result & get if operator at the end of the calculation
function displayResults() {
    if ((calcInputArray.length % 2) === 0) { 
        lastResultDisplay.textContent = currentCalcDisplay.textContent.substring(0, currentCalcDisplay.textContent.length - 1) + " =";
        currentCalcDisplay.textContent = `${a} ${op}`;
    } else {
        lastResultDisplay.textContent = currentCalcDisplay.textContent + " =";
        currentCalcDisplay.textContent = a;
    } 
}

// checks operator and then calculate 
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

// result max fraction digits 
const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,      
    maximumFractionDigits: 11,
 });