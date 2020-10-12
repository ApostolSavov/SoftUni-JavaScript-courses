function sum(input) {
    console.log(+input[0] + +input[input.length - 1])
}

function week(input) {
    let nubmer = +input
    let week = [`Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`, `Sunday`]
    switch (true) {
        case nubmer > 7: console.log(`Invalid day!`); break
        default: console.log(week[nubmer - 1]);
    }

}

function reverse(number, input) {
    let array = []
    let text = ``
    for (let i = 0; i < number; i++) {
        array[i] = input[i]
    }
    array.reverse()
    for (let i = 0; i < array.length; i++) {
        text += `${array[i]} `
    }
    console.log(text);
}

function string(input) {
    let text = ``
    for (let i = input.length - 1; i >= 0; i--) {
        text += input[i] + ` `
    }
    console.log(text);
}

function evensum(input) {
    let sum = 0

    for (let i = 0; i < input.length; i++) {

        if (input[i] % 2 === 0) sum += +input[i]
    }
    console.log(sum);
}

function evenoddsum(input) {
    let sumeven = 0
    let sumodd = 0

    for (let i = 0; i < input.length; i++) {

        input[i] % 2 === 0 ? sumeven += +input[i] : sumodd += +input[i]
    }
    console.log(sumeven - sumodd);
}

function equal(a, b) {
    let sum = 0
    let flag = false
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            console.log(`Arrays are not identical. Found difference at ${i} index`)
            flag = true
            break
        }
    }
    if (!flag) {
        for (let num of a) {
            sum += +num
        }
        console.log(`Arrays are identical. Sum: ${sum}`)
    }
}

function condense(a) {
    let array = []
    while (a.length > 1) {
        for (let j = 0; j < a.length - 1; j++) {
            array[j] = (a[j] + a[j + 1])
        }
        a = array
        array = []
    }

    console.log(a[0]);
}


let a = (Math.abs(-12.25.toFixed(2)))

console.log(typeof a)
