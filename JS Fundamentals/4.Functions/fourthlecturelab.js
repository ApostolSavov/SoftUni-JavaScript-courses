function repeat(a, b) {
    let string = a
    let n = b
    let text = ``
    for (let i = 0; i < n; i++) {
        text += string
    }
    console.log(text);
}

function grade(a) {
    let grade = +a
    switch (true) {
        case grade <= 2.99: console.log(`Fail`); break
        case grade <= 3.49: console.log(`Poor`); break
        case grade <= 4.49: console.log(`Good`); break
        case grade <= 5.49: console.log(`Very good`); break
        default: console.log(`Excellent`); break
    }
}

function power(a, b) {
    let numb = +a
    let power = +b
    console.log(Math.pow(numb, power));
}

function order(a, b) {
    let prod = a
    let quant = +b
    let total = 0
    switch (prod) {
        case "coffee": total = quant * 1.5; break
        case "coke": total = quant * 1.4; break
        case "water": total = quant * 1; break
        case "snacks": total = quant * 2; break
    }
    console.log(total.toFixed(2));
}

function calc(a, b, c) {
    switch (c) {
        case "multiply":
            let multiply = (a, b) => a * b
            console.log(multiply(a, b))
            break
        case "divide":
            let divide = (a, b) => a / b
            console.log(divide(a, b))
            break
        case "subtract":
            let subtract = (a, b) => a - b
            console.log(subtract(a, b))
            break
        case "add":
            let add = (a, b) => a + b
            console.log(add(a, b))
            break
    }
}


function wrongresult(a, b, c) {
    let minus = 0
    for (let i = 0; i < 3; i++) {
        if (arguments[i] < 0) {
            minus++
        }
        else if (arguments[i] == 0){
            minus = 0
            break
        }
    }
    if (minus % 2 == 0) {
        console.log('Positive');
    }
    else {
        console.log("Negative");
    }
}

wrongresult(1,0,-1)