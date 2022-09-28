function add (a,b) {
    return a + b;
};

function subtract (a,b) {
    return a - b;
}

function multiply (a,b) {
    return a * b;
}

function divide (a,b) {
    return a / b; 
}

function operate (a, op, b) {
    if (op === "+") (a,b) => add();
    else if (op === "-") (a,b) => subtract();
    else if (op === "*") (a,b) => multiply();
    else if (op === "/") (a,b) => divide();
}