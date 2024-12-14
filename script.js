//Basic Arithmetic functions :-
function add(operand1,operand2){
    return operand1+operand2;
}

function subtract(operand1,operand2){
    return operand1-operand2;
}

function multiply(operand1,operand2){
    return operand1*operand2;
}

function divide(operand1,operand2){
    return operand1/operand2;
}

function remainder(operand1,operand2){
    return operand1%operand2;
}
//Variables to store the three required inputs:
let operand1,operand2,operator;

//Operate function is used to call an arithmetic function based on the operator.
function operate(operand1,operand2,operator){
    if(operator==='+') return add(operand1,operand2);
    else if(operator==='-') return subtract(operand1,operand2);
    else if(operator==='X') return multiply(operand1,operand2);
    else if(operator==='÷') return divide(operand1,operand2);
    else if(operator==='%') return remainder(operand1,operand2);
}