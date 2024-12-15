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

//Extractor is used to separate the input expression into two operands.
//Limit the number of splits to 2.
//Insert the operator at the beginning of second operand.
function extractor(expression){
    const regex = new RegExp(`([${operatorString}].*)`);
    let extracted;
    if(expression[0]==='-'){
        extracted= expression.slice(1).split(regex, 2);
        extracted[0]='-'+extracted[0];
    }else{
        extracted= expression.split(regex, 2);
    }
    return extracted;
}

//Operate function is used to call an arithmetic function based on the operator.
function operate(operand1,operand2){
    const operator=operand2[0];
    //Check if operand2 is an expression in itself.
    const secondExpression=extractor(operand2.slice(1));
    console.log(secondExpression);
    if(secondExpression.length!==1){
        suffixExpression=operand2.slice(secondExpression[0].length+1);
        operand2=secondExpression[0];
    }else{
        operand2=operand2.slice(1);
    }
    if(operator==='+') return roundUp(add(+operand1,+operand2));
    else if(operator==='-') return roundUp(subtract(+operand1,+operand2));
    else if(operator==='x') return roundUp(multiply(+operand1,+operand2));
    else if(operator==='÷') return roundUp(divide(+operand1,+operand2));
    else if(operator==='%') return roundUp(remainder(+operand1,+operand2));
}

//roundUp function rounds a decimal number up to 3 decimal places;
function roundUp(num){
    return Math.ceil(num*1000)/1000;
}

//Variable to store the result of operation:
let result=0;

//variable to store part of the expression which will not be evaluated.
let suffixExpression="";

//String that stores all operators. We can use it to check if the input contains an operator.
const operatorString='\\+\\-x÷%';

//Create references to display partitions and initialize them with zero.
const current=document.querySelector(".current");
current.textContent='0';
const previous=document.querySelector(".previous");
previous.textContent='0';

// Add event listener for digit buttons.
// Limit decimal point to only one per expression.
const digits=document.querySelectorAll(".digit");
digits.forEach((digit)=>{
    digit.addEventListener('click',function(e){
        if(current.textContent==='0')current.textContent='';
        if(!(e.target.textContent==='.' && current.textContent.includes('.'))){
            current.textContent+=e.target.textContent;
        }
    });
});

//Add event listener for operators.
//Prevent the user from entering an operator at the beginning of an expression except negative.
//Prevent the user from entering operators consecutively.
const operators=document.querySelectorAll(".operator");
operators.forEach((operator)=>{
    operator.addEventListener('click',function(e){
        const currentString=current.textContent;
        if(currentString !== "0" && currentString!=="" && currentString!=="-"){
            if(operatorString.includes(currentString.at(-1))){
                current.textContent=currentString.slice(0,-1)+e.target.textContent;
            }else{
                current.textContent+=e.target.textContent;
            }
        }else if(e.target.textContent==='-'){
            current.textContent=e.target.textContent;
        }
    });
});

//Add event listener for clear button.
const clear=document.querySelector("#clear")
clear.addEventListener('click',()=>{
    current.textContent='0';
    previous.textContent='0';      //Remove all existing data.
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
    const expression=extractor(current.textContent);
    console.log(expression);
    result=operate(expression[0],expression[1]);
    current.textContent=""+result+suffixExpression;
    suffixExpression="";
})