document.addEventListener("DOMContentLoaded", enableScript);

let userNumbers = [];
let msg = "";

function enableScript(){
    document.querySelector("input").addEventListener("keyup", check);
}//end function enableScript

function check() {
    let string = document.querySelector("input").value;
    let lengthString = string.length - 1;
    if (event.key === "Enter") {
        event.preventDefault();
        if (isGreater(string) && userNumbers.length > 1) {
            resetFun();
            startFun();
        }
        else errorMessageManagementFun(`Enter at least two numbers in the input field.`);
    }//end if user push enter
    if (string[string.length - 1] == ' ') isGreater(string);
    else if (!Number.isInteger(parseInt(string[string.length - 1]))) {
        document.querySelector("input").value = string.substring(0, lengthString);
    }
}//end function check
// The 'check' function checks the input data if it is correct.
// Enable and disable error messages, start sequence control.
// The 'isGreater' function helps in controlling the input data.

function isGreater(testString) {
    let sentinelGreater = true;
    let strArray = testString.split(" ");
    let numArray = strArray.map(Number);
    if (numArray[numArray.length - 1] == "") numArray.pop();

    let lengthArr = numArray.length - 1;

    if (numArray.length > 1) {
        if (numArray[lengthArr] <= numArray[lengthArr - 1]) {
            numArray.pop();
            document.querySelector("input").value = numArray.join(" ") + " ";
            errorMessageManagementFun(`The last number entered has been removed when not greater than the penultimate. <br>Please enter a higher number than the previous one.`);
            sentinelGreater = false;
        }
        else {
            resetFun();
            userNumbers = numArray;
            sentinelGreater = true;
        }
    }//end if there is more then one number in array
    else {
        if (numArray[0] < 1) {
            document.querySelector("input").value = "";
            errorMessageManagementFun(`For this exercise, in this first form, positive numbers greater than zero are required.`);
            sentinelGreater = false;
        }
        else {
            resetFun();
            userNumbers = numArray;
            sentinelGreater = true;
        }
    }
    return sentinelGreater;
}//end function isGreater
//The 'isGreater' function checks if a number is greater than the previous one.
// Enable and disable error messages, start sequence control.

function errorMessageManagementFun(errMsg) {
    document.getElementById("err").innerHTML = errMsg;
    document.getElementById("err").classList.add("alert-danger");
}//end function errorMessageManagementFun
//The 'errorMessageManagementFun' function enables error messages

function resetFun() {
    document.getElementById("err").innerHTML = "";
    document.getElementById("err").classList.remove("alert-danger");
}//end function resetFun
//The 'resetFun' function disable error messages

function startFun() {
    document.querySelector("input").disabled = true;
    document.getElementById("userNum").innerHTML = `Your number: <br> ${userNumbers.join(" ")}<br><br>`;
    if (userNumbers.length == 2) easySequence();
    else if (userNumbers.length == 3) noEasySequence();
    else difficultSequence();
    arePrimeNumbers();
    isFibonacciSequence();
    isBellNumbers();
    setTimeout(() => {
        if (msg == "") msg = "I am sorry. I couldn't find any sequences";
        document.getElementById("resp").innerHTML = msg;
    }, 500)//end setTimeout
}//end function startFun
//The 'startFun' function is the function that determines the correct entry of the data.
//From this moment on, the other functions that take care of understanding what the correct numerical sequence may be start in sequence.

//START OF CONTROL FUNCTIONS

function easySequence() {
    continuousEasySequence('add', (userNumbers[1] - userNumbers[0]), 0);
    if ((userNumbers[1] % userNumbers[0]) == 0) continuousEasySequence('mul', (userNumbers[1] / userNumbers[0]), 0);
    else {
        let x = parseInt(userNumbers[1] / userNumbers[0]);
        let y = parseInt(userNumbers[1] % userNumbers[0]);
        continuousEasySequence('xy', x, y);
    }
}//end function easySequence

function noEasySequence() {
    let difBA = userNumbers[1] - userNumbers[0];
    let difCB = userNumbers[2] - userNumbers[1];
    let x = parseInt(userNumbers[1] / userNumbers[0]);
    let y = parseInt(userNumbers[1] % userNumbers[0]);
    if (difBA == difCB) continuousEasySequence('add', difBA, 0);
    else if (userNumbers[2] == (userNumbers[1] * x) + y) continuousEasySequence('xy', x, y);
}//end function noEeasySequence

function difficultSequence() {
    //i have not idea
}//end function difficultSequence

function continuousEasySequence(o, x, y) {
    let tempArray = [...userNumbers];
    let indexArr = userNumbers.length - 1;
    for (let i = indexArr; i < (indexArr + 10); i++) {
        if (o == 'add') tempArray.push(tempArray[i] + x);
        else if (o == 'mul') tempArray.push(tempArray[i] * x);
        else if (o == 'xy' && x != 1) tempArray.push((tempArray[i] * x) + y);
    }
    tempArray.splice(0, 2);
    msg += `Easy Sequence ${o} <br> ${tempArray.join(" ")}<br><br>`;
}//end function continuousEasySequence

//START FUNCTIONS CHECK 'PRIME NUMBERS'
function arePrimeNumbers() {
    let sentinelPN = true;
    for (const element of userNumbers) {
        if (element == 1 || element == 2 || element == 3 || element == 5 || element == 7) sentinelPN = true;
        else if (element % 2 == 0 || element % 3 == 0 || element % 5 == 0 || element % 7 == 0) {
            sentinelPN = false;
            break;
        }
        else {
            if (insightIntoPrimeNumbers(element)) {
                sentinelPN = false;
                break;
            }
        }
    }//end for
    if (sentinelPN) msg += `The numbers entered are all prime numbers.<br><br>`;
}//end function arePrimeNumbers

function insightIntoPrimeNumbers(n) {
    let sentinelIPN = false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
            sentinelIPN = true;
            break;
        }
    }
    return sentinelIPN;
}//end function insightIntoPrimeNumbers
//END FUNCTIONS CHECK 'PRIME NUMBERS'

//START FUNCTION CONTROL 'FIBONACCI SEQUENCE'
function isFibonacciSequence() {
    let sentinelF = false;
    if (!(userNumbers[0] == 1 && userNumbers[1] == 2)) {
        let checkZero = checkFibonacciNumber(5 * userNumbers[0] * userNumbers[0] + 4) || checkFibonacciNumber(5 * userNumbers[0] * userNumbers[0] - 4);
        let checkOne = checkFibonacciNumber(5 * userNumbers[1] * userNumbers[1] + 4) || checkFibonacciNumber(5 * userNumbers[1] * userNumbers[1] - 4);
        if (checkZero && checkOne && userNumbers[2] == undefined) sentinelF = true;
        else if (userNumbers[2] != undefined) {
            for (let i = 2; i < userNumbers.length; i++) {
                if (userNumbers[i] != userNumbers[i - 1] + userNumbers[i - 2]) {
                    sentinelF = false;
                    break;
                }
                else sentinelF = true;
            }
        }
        if (sentinelF) continuousFibonacciSequence(userNumbers[userNumbers.length - 2], userNumbers[userNumbers.length - 1]);
    }//end if first num is not one or second is not two
    else continuousFibonacciSequence(userNumbers[0], userNumbers[1]);
}//end function isFibonacciSequence

function checkFibonacciNumber(x) {
    let s = parseInt(Math.sqrt(x));
    return (s * s == x);
}//end function checkFibonacciNumber

function continuousFibonacciSequence(f, s) {//f=first s=second
    let fibArr = [f, s];
    for (let i = 0; i < 10; i++) {
        fibArr[i + 2] = fibArr[i] + fibArr[i + 1];
    }
    fibArr.splice(0, 2);
    msg += `The numbers entered are part of the Fibonacci Sequence <br> ${fibArr.join(" ")}<br><br>`;
}//end function continuousFibonacciSequence
//END FUNCTION CONTROL 'FIBONACCI SEQUENCE'

//START FUNCTION CONTROL 'BELL SEQUENCE'
function isBellNumbers() {
    let bellArr = askArray();
    let sentinellBellCode = 0;//0 not found - 1 level - 2 level
    let index = 0;
    let bellLevel = 0;//triangle level
    for (let i = 1; i < bellArr.length; i++) {
        if (userNumbers[index] == bellArr[i][0]) {
            index++;
            if (bellLevel == 0) {
                bellLevel = i;
                sentinellBellCode = 2;
            }
        }
        else if (bellLevel != 0) break;

        if (index == userNumbers.length) {
            sentinellBellCode = 1;
            break;
        }
    }//end first for first level
    if (sentinellBellCode == 2 && bellLevel != 0) {//if check second level
        for (let i = 0; i < userNumbers.length; i++) {
            if (userNumbers[i] != bellArr[bellLevel][i]) {
                sentinellBellCode = 0;
                break;
            }
        }
    }//end if check second level
    if (sentinellBellCode == 0) {//if another opportunity
        let tempSentinell = false;
        for (let i = 1; i < bellArr.length; i++) {
            if (bellArr[i].length >= userNumbers.length) {
                for (let j = 0; j < userNumbers.length; j++) {
                    if (bellArr[i].indexOf(userNumbers[j]) == -1) {
                        tempSentinell = false;
                        sentinellBellCode = 0;
                        break;
                    }
                    else {
                        bellLevel = i;
                        tempSentinell = true;
                    }
                }
            }
            if (tempSentinell) {
                sentinellBellCode = 2;
                break;
            }
        }//end first for if another opportunity
    }//end if another opportunity

    if (sentinellBellCode == 1) {
        let tempBellArray = [];
        for (let i = bellLevel + 3; i < bellLevel + 13; i++) {
            tempBellArray.push(bellArr[i][0]);
        }
        msg += `The numbers entered are part of the Bell Sequence <br> ${tempBellArray.join(" ")}<br><br>`;
    }
    else if (sentinellBellCode == 2) msg += `The numbers entered are part of Triangle scheme level ${bellLevel + 1} of the Bell Sequence <br> ${bellArr[bellLevel].join(" ")}<br><br>`;
}//end function isBellNumbers

function askArray() {
    let it = 20;
    let bell = new Array(it + 1);
    for (let i = 0; i < it + 1; i++) {
        bell[i] = new Array(i + 1);
    }
    bell[0][0] = 1;

    for (let i = 1; i <= it; i++) {
        bell[i][0] = bell[i - 1][i - 1];
        for (let j = 1; j <= i; j++)
            bell[i][j] = bell[i - 1][j - 1] + bell[i][j - 1];
    }
    return bell;
}//end function askArray
//END FUNCTION CONTROL 'BELL SEQUENCE'