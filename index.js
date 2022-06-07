// step 1: select all the DOM elements that we need
const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numberEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");
const equalEl = document.querySelector(".equal");

// Variables
let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

// add a listenter to all the numbers
numberEl.forEach((number) => {
  // Creating dot logic
  number.addEventListener("click", (e) => {
    // if the . button is clicked and haveDot is false, then add the dot
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    }
    // if the . button is clicked and haveDot is true, then do nothing
    else if (e.target.innerText === "." && haveDot) {
      return;
    }
    dis2Num += e.target.innerText;
    display2El.innerText = dis2Num;
  });
});

// add a listener for all operation
operationEl.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    // case: User can't click on operator first i.e. +2, / 3 not possible
    if (!dis2Num) return;
    // After clicking on operand we have to take new number that can contain dot
    haveDot = false;
    const operationName = e.target.innerText;
    // Math operation will perform only when we have more than 2 operand
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(dis2Num);
    }
    clearVar(operationName);
    lastOperation = operationName
    console.log(result);
  });
});

/**
 * function: clearVar
 * 1. clear the dis2Num content
 * 2. move dis2Num content on dis1Num and append it
 * 3. show evaluatoin of dis1Num on temp-display
 */
function clearVar(name = "") {
  dis1Num += dis2Num + " " + name + " ";
  display1El.innerText = dis1Num;
  display2El.innerText = " ";
  dis2Num = "";
  tempResultEl.innerText = result;
}

function mathOperation(){
    if(lastOperation === 'x'){
        result = parseFloat(result) * parseFloat(dis2Num);
    }else if(lastOperation === '+'){
        result = parseFloat(result) + parseFloat(dis2Num);
    }else if(lastOperation === '-'){
        result = parseFloat(result) - parseFloat(dis2Num);
    }else if(lastOperation === '/'){
        result = parseFloat(result) / parseFloat(dis2Num);
    }else if(lastOperation === '%'){
        result = parseFloat(result) % parseFloat(dis2Num);
    }
}

equalEl.addEventListener('click', (e)=>{
    if(!dis2Num || !dis1Num){
        return;
    }
    haveDot = false;
    mathOperation();
    clearVar();
    display2El.innerText = result;
    tempResultEl.innerText = '';
    dis2Num = result;
    dis1Num = '';
})

clearLastEl.addEventListener('click', (e)=>{
    display2El.innerText = '';
    dis2Num = '';
})

clearAllEl.addEventListener('click', (e)=>{
    display1El.innerText = '0';
    display2El.innerText = '0';
    dis1Num = '';
    dis2Num = '';
    result = '';
    lastOperation = '';
    tempResultEl.innerText = '0';
})

//for keyboard input
window.addEventListener('keydown', (e)=>{
    if(
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||   
        e.key === '9' ||
        e.key === '.'
    ){
        clickButton(e.key);
    }else if(
        e.key === '/'||
        e.key === '+'||
        e.key === '-'||
        e.key === '%'||
        e.key === '='
    ){
        clickOperation(e.key);
    }
    else if(e.key === '*'){
        clickOperation('x');
    }
    else if(e.key === 'Enter'){
        equalEl.click();
    }
});
function clickButton(key){
    numberEl.forEach(button =>{
        if(button.innerText === key){
            button.click();
        }
    })
}
function clickOperation(key){
    operationEl.forEach(button =>{
        if(button.innerText === key){
            button.click();
        }
    })
}