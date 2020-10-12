function sum(input) {
    let first = +input[0]
    let last = +input[input.length - 1]
    let sum = (a, b) => a + b
    console.log(sum(first, last));
}


function negativePositive(input) {
    let newArray = []
    let convertArray = (array) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i] < 0) {
                newArray.unshift(array[i])
            } else {
                newArray.push(array[i])
            }
        }
        return newArray
    }

    ((array) => {
        for (let j = 0; j < array.length; j++) {
            console.log(array[j]);
        }
    })(convertArray(input))
}

function firstK(input) {
    let k = +input.shift()
    let firstLine = ''
    let secondLine = ''
    let generateFirst = (array) => {
        for (let i = 0; i < k; i++) {
            firstLine += (array[i]).toString() + ' '
        }
        return firstLine
    }
    let generateSecond = (array) => {
        for (let j = array.length - k; j < array.length; j++) {
            secondLine += (array[j].toString()) + ' '
        }
        return secondLine
    }
    let printLines = () => {
        console.log(generateFirst(input));
        console.log(generateSecond(input));
    }
    printLines()
}

function lastK(n, k) {
    let array = []
    let currentNum = 0

    function fillArray(length, modifier) {
        array[0] = 1
        for (let i = 1; i < n; i++) {
            let indexCalc = 0
            for (let j = i - 1; j >= indexCalc; j--) {
                i - k < 0 ? indexCalc = 0 : indexCalc = i - k
                currentNum += array[j]
            }
            array[i] = currentNum
            currentNum = 0
        }
        return array.join(' ')
    }

    console.log(fillArray(n, k));
}

function filterOdd(input) {
    let newArray = input.filter((x, i) => i % 2 !== 0)
    newArray = newArray.map((x) => x * 2)
    newArray.reverse()
    console.log(newArray.join(' '));
}

function smallest(input) {
    let arrayCopy = input.slice()
    arrayCopy.sort((a, b) => a - b)
    console.log(arrayCopy[0], arrayCopy[1]);
}

function products(input) {
    let array = input.slice()
    array.sort((a, b) => a.localeCompare(b))
    array = array.map((x, i) => `${i + 1}.` + x)
    console.log(array.join(`\n`));
}

function manipulate(input) {
    let array = input.shift().split(' ')
    let operations = (input) => {
        for (let i = 0; i < input.length; i++) {
            let currOperation = input[i].split(' ')

            switch (currOperation[0]) {
                case 'Add': array.push(currOperation[1]); break
                case 'Remove': array = array.filter(x => x !== currOperation[1]); break
                case 'RemoveAt': array.splice(currOperation[1], 1); break
                case 'Insert': array.splice(currOperation[2], 0, currOperation[1]); break
            }
        }

        return array.join(' ')
    }

    console.log(operations(input));
}

