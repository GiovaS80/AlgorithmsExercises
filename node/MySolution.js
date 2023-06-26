console.log("********** Start Program **********");
console.log();

let userNumbers = process.argv;
userNumbers.splice(0, 2);
if (userNumbers.length == 0) console.log("No number sequence has been entered");
else if (userNumbers.length == 1) console.log("The project requires you to enter a number sequence.");
else checkAreNumbers();

function checkAreNumbers() {
    let tempArray = [];
    try {
        for (let i = 0; i < userNumbers.length; i++) {
            tempArray[i] = Number(userNumbers[i]);
            if (Number.isInteger(tempArray[i])) {
                if (i == 0 && tempArray[i] <= 0) throw "For this version of the project, the first number cannot be zero or even negative.";
                else if (i != 0 && tempArray[i] <= tempArray[i - 1]) throw "The required number sequence must have increasing numbers.";
            }//end if number is integer
            else throw "The design accepts only an increasing sequence of positive integers."
        }//end for
        userNumbers = tempArray;
        console.log(`Your number: \n${userNumbers.join(" ")}\n`);
        startSequenceFunctions();
    } catch (error) {
        console.log(error);
    }
}//end function checkAreNumbers

function startSequenceFunctions() {
    let sentinel = true;
    arePrimeNumbers();
    if (userNumbers.length == 2) {
        if (easySequence()) sentinel = false;
    }
    else if (userNumbers.length == 3) {
        if (noEasySequence()) sentinel = false;
    }
    else {
        if (difficultSequence()) sentinel = false;
    }

    if (isFibonacciSequence()) sentinel = false;

    if (isBellNumbers()) sentinel = false;

    if (sentinel) console.log("I am sorry. With the inserted sequence, with this version of the project, it was not possible to determine a continuous sequence\n");
}//end function startSequenceFunctions

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
    if (sentinelPN) console.log(`The numbers entered are all prime numbers.\n`);
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

//START GROUP FUNCTIONS EASY - NOT EASY - DIFFICULT
function easySequence() {
    continuousEasySequence('add', (userNumbers[1] - userNumbers[0]), 0);
    if ((userNumbers[1] % userNumbers[0]) == 0) continuousEasySequence('mul', (userNumbers[1] / userNumbers[0]), 0);
    else {
        let x = parseInt(userNumbers[1] / userNumbers[0]);
        let y = parseInt(userNumbers[1] % userNumbers[0]);
        continuousEasySequence('xy', x, y);
    }
    return true;
}//end function easySequence

function noEasySequence() {
    let sentinelNES = true;
    let difBA = userNumbers[1] - userNumbers[0];
    let difCB = userNumbers[2] - userNumbers[1];
    let x = parseInt(userNumbers[1] / userNumbers[0]);
    let y = parseInt(userNumbers[1] % userNumbers[0]);
    if (difBA == difCB) continuousEasySequence('add', difBA, 0);
    else {
        for (let i = 0; i < userNumbers[2]; i++) {
            if (userNumbers[2] == (userNumbers[1] * x) + y + i) {
                continuousEasySequence("xy", x, y + i);
                sentinelNES = true;
                break;
            } else sentinelNES = false;
        }//end for
    }//end else
    return sentinelNES;
}//end function noEeasySequence

function difficultSequence() {
    let sentinelDS = false;
    let dif = userNumbers[1] - userNumbers[0];
    let quota = userNumbers[1] / userNumbers[0];
    let par;
    let operation;
    for (let i = 2; i < userNumbers.length; i++) {
        if ((userNumbers[i] - userNumbers[i - 1]) != dif) {
            sentinelDS = false;
            break;
        }
        else {
            operation = "add";
            par = dif;
            sentinelDS = true;
        }
    }
    if (Number.isInteger(quota) && !sentinelDS) {
        for (let i = 2; i < userNumbers.length; i++) {
            if ((userNumbers[i] / userNumbers[i - 1]) != quota) {
                sentinelDS = false;
                break;
            }
            else {
                operation = "mul";
                par = quota;
                sentinelDS = true;
            }
        }
    }
    if (sentinelDS) continuousEasySequence(operation, par, 0);
    else console.log("Did you really enter a sequence with more than 3 numbers? \nI have trouble finding the sequence with less than 3 numbers, and you enter a sequence with more than 3 numbers?\n");
    //i have not idea
    return sentinelDS;
}//end function difficultSequence

//END GROUP FUNCTIONS EASY - NOT EASY - DIFFICULT

//START FUNCTION CONTROL 'FIBONACCI SEQUENCE'
function isFibonacciSequence() {
    let sentinelF = false;
    let checkZero = checkFibonacciNumber(5 * userNumbers[0] * userNumbers[0] + 4) || checkFibonacciNumber(5 * userNumbers[0] * userNumbers[0] - 4);
    let checkOne = checkFibonacciNumber(5 * userNumbers[1] * userNumbers[1] + 4) || checkFibonacciNumber(5 * userNumbers[1] * userNumbers[1] - 4);
    if (checkZero && checkOne && checkFibonacciSequence(userNumbers[0], userNumbers[1])) {
        if (userNumbers.length > 2) {
            for (let i = 2; i < userNumbers.length; i++) {
                if (userNumbers[i] != userNumbers[i - 1] + userNumbers[i - 2]) {
                    sentinelF = false;
                    break;
                } else
                    sentinelF = true;
            } // end for
        } else
            sentinelF = true;
    } // end if all positive
    if (sentinelF)
        continuousEasySequence("Fibonacci", 0, 0);
    return sentinelF;
}//end function isFibonacciSequence

function checkFibonacciNumber(x) {
    let s = parseInt(Math.sqrt(x));
    return (s * s == x);
}//end function checkFibonacciNumber

function checkFibonacciSequence(f, s) {// f=first s=second
    let sentinelCFS = false;
    let x = 1;
    let y = 2;
    let z;
    for (let i = 0; i < 20; i++) {
        if (f == x && s == y) {
            sentinelCFS = true;
            break;
        } else {
            z = x + y;
            x = y;
            y = z;
        }
    }
    return sentinelCFS;
}// end checkFibonacciSequence
//END FUNCTION CONTROL 'FIBONACCI SEQUENCE'

//START FUNCTION CONTROL 'BELL SEQUENCE'
function isBellNumbers() {
    let bellArr = askArray();
    let sentinellBellCode = 0;//0 not found - 1 level - 2 level
    let index = 0;
    let bellLevel = 0;//triangle level
    let sentinelBN = false;
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
        console.log(`The numbers entered are part of the Bell Sequence \n${tempBellArray.join(" ")}\n`);
        sentinelBN = true;
    }
    else if (sentinellBellCode == 2) {
        console.log(`The numbers entered are part of Triangle scheme level ${bellLevel + 1} of the Bell Sequence \n${bellArr[bellLevel].join(" ")}\n`);
        sentinelBN = true;
    }

    return sentinelBN;
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
        for (let j = 1; j <= i; j++) {
            bell[i][j] = bell[i - 1][j - 1] + bell[i][j - 1];
        }
    }
    return bell;
}//end function askArray
//END FUNCTION CONTROL 'BELL SEQUENCE'

function continuousEasySequence(o, x, y) {
    let tempArray = [...userNumbers];
    let indexArr = userNumbers.length - 1;
    for (let i = indexArr; i < (indexArr + 10); i++) {
        if (o == 'add') tempArray.push(tempArray[i] + x);
        else if (o == 'mul') tempArray.push(tempArray[i] * x);
        else if (o == 'xy') tempArray.push((tempArray[i] * x) + y);
        else if (o == "Fibonacci") tempArray.push(tempArray[i - 1] + tempArray[i - 2]);
    }
    tempArray.splice(0, (indexArr + 1));
    console.log(`Easy Sequence ${o} \n${tempArray.join(" ")}\n`);
}//end function continuousEasySequence
console.log();
console.log("********** End Program **********");