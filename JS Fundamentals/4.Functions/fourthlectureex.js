function smallest(a, b, c) {
    let check = Math.min(a, b, c);
    console.log(check);
}

function smallest(a, b, c) {
    let check = (a, b, c) => Math.min(a, b, c);
    console.log(check(a, b, c));
    return check(a, b, c)
}


function addorsubtract(a, b, c) {
    let sum = (x1, x2) => x1 + x2;
    let subtract = (sum, x3) => sum - x3;
    console.log(subtract(sum(a, b), c))
}

function range(a, b) {
    let charConvert = (x) => x.charCodeAt(0);
    let lowerNum = (x1, x2) => Math.min(x1, x2);
    let higherNum = (x1, x2) => Math.max(x1, x2);
    let lowBoundary = lowerNum(charConvert(a), charConvert(b));
    let highBoundary = higherNum(charConvert(a), charConvert(b));
    let string = '';
    for (i = lowBoundary + 1; i < highBoundary; i++) {
        string += String.fromCharCode(i) + ' '
    }
    console.log(string);
}

function oddOrEven(number) {
    let numberString = number.toString()
    let odd = 0;
    let even = 0;
    let addOdd = (x) => odd += +x;
    let addEven = (x) => even += +x;
    let message = () => console.log(`Odd sum = ${odd}, Even sum = ${even}`);

    for (let i = 0; i < numberString.length; i++) {
        numberString[i] % 2 == 0 ? addEven(numberString[i]) : addOdd(numberString[i])
    }

    message()
}

function palindrome(input) {
    let currentNumber = '';
    let mirrorNumber = (number) => {
        let currentMirrorNumber = '';
        for (let j = number.length - 1; j >= 0; j--) {
            currentMirrorNumber += number[j]
        }
        if (currentMirrorNumber === currentNumber) {
            console.log('true');
        }
        else {
            console.log('false');
        }
    }

    for (let i = 0; i < input.length; i++) {
        currentNumber = input[i].toString()
        mirrorNumber(input[i].toString())
    }
}

function password(pass) {
    let validator = true
    let lengthCheck = (string) => {
        if (!(/^.{6,10}$/.test(string))) {
            console.log('Password must be between 6 and 10 characters')
            validator = false
        }
    }
    let symbolsCheck = (string) => {
        if (!(/^[A-Za-z0-9]+$/.test(string))) {
            console.log('Password must consist only of letters and digits')
            validator = false
        }
    }
    let digitCheck = (string) => {
        if (!(/(?:\d.*?){2,}/.test(string))) {
            console.log('Password must have at least 2 digits')
            validator = false
        }
    }
    let wrapperFunction = () => {
        lengthCheck(pass)
        symbolsCheck(pass)
        digitCheck(pass)
        validator ? console.log('Password is valid') : null
    }
    wrapperFunction()
}

function matrix(n) {
    let row = (n) => {
        let string = ''
        for (let j = 0; j < n; j++) {
            string += n.toString() + ' '
        }
        return string
    }
    let rowCount = (n) => {
        for (let i = 0; i < n; i++) {
            console.log(row(n));
        }
    }

    rowCount(n)
}

function perfect(number) {
    let divisorsList = []

    let positiveCheck = (number) => number > 0 ? true : false

    let findDivisors = (number) => {
        for (let i = 1; i < number; i++) {
            if (number % i === 0) divisorsList.push(i)
        }
    }

    let halfSumCheck = (number) => {
        positiveCheck(number)
        findDivisors(number)
        if (divisorsList.reduce((a, b) => a + b) === number && positiveCheck(number) === true) {
            console.log(`We have a perfect number!`);
        } else {
            console.log(`It's not so perfect.`);
        }
    }

    halfSumCheck(number)
}

function loading(number) {
    let percentageString = ''
    let loadingBarString = ''
    let firstLine = ''
    let secondLine = ''
    let percentage = (number) => percentageString += `${number}%`
    let loadingBar = (number) => {
        loadingBarString += '['
        for (let i = 0; i < 10; i++) {
            i < number / 10 ? loadingBarString += '%' : loadingBarString += '.'
        }
        loadingBarString += ']'
        return loadingBarString
    }

    let generateMessage = (number) => {
        if (number <= 99) {
            firstLine += percentage(number) + ' ' + loadingBar(number)
            secondLine += 'Still loading...'
        } else {
            firstLine += percentage(number) + ' ' + 'Complete!'
            secondLine += loadingBar(number)
        }

        console.log(firstLine);
        console.log(secondLine);
    }

    generateMessage(number)
}

function factorial(a, b) {
    let calc = (n) => {
        if (n == 0 || n == 1) {
            return 1;
        }
        return n * calc(n - 1);
    }

    let division = (a, b) => a / b

    let result = division(calc(a), calc(b))

    console.log(result.toFixed(2));
}

