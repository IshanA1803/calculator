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

//Variable to store the result of operation:
let result=0;

//Operate function is used to call an arithmetic function based on the operator.
function operate(operand1,operand2,operator){
    if(operator==='+') return add(operand1,operand2);
    else if(operator==='-') return subtract(operand1,operand2);
    else if(operator==='x') return multiply(operand1,operand2);
    else if(operator==='÷') return divide(operand1,operand2);
    else if(operator==='%') return remainder(operand1,operand2);
}

//Create references to display partitions and initialize them with zero.
const current=document.querySelector(".current");
current.textContent='0';
const previous=document.querySelector(".previous");
previous.textContent='0';

//Add event listener for digit buttons.
const digits=document.querySelectorAll(".digit");
digits.forEach((digit)=>{
    digit.addEventListener('click',function(e){
        if(current.textContent==='0')current.textContent='';
        current.textContent+=e.target.textContent;
    });
});

//Add event listener for operators.
const operators=document.querySelectorAll(".operator");
operators.forEach((operator)=>{
    operator.addEventListener('click',function(e){
        current.textContent+=e.target.textContent;
    });
});

//Add event listener for clear button.
const clear=document.querySelector("#clear")
clear.addEventListener('click',()=>{
    current.textContent='0';
})

//Add event listener for delete button.
const deleteButton=document.querySelector("#delete");
deleteButton.addEventListener('click',()=>{
    const string=current.textContent;
    if(string!==''){
        current.textContent=string.slice(0,-1);
    }
})

//Add event listener for equals to button.
const equalsTo=document.querySelector(".equalsTo");
equalsTo.addEventListener('click',()=>{
    previous.textContent=""+result;
    if(current.textContent.includes('+')){
        const expression=current.textContent.split('+');
        result=operate(+expression[0],+expression[1],'+');
        current.textContent=result;
    }else if(current.textContent.includes('-')){
        const expression=current.textContent.split('-');
        result=operate(+expression[0],+expression[1],'-');
        current.textContent=result;
    }else if(current.textContent.includes('x')){
        const expression=current.textContent.split('x');
        result=operate(+expression[0],+expression[1],'x');
        current.textContent=result;
    }else if(current.textContent.includes('÷')){
        const expression=current.textContent.split('÷');
        result=operate(+expression[0],+expression[1],'÷');
        current.textContent=result;
    }else if(current.textContent.includes('%')){
        const expression=current.textContent.split('%');
        result=operate(+expression[0],+expression[1],'%');
        current.textContent=result;
    }
})