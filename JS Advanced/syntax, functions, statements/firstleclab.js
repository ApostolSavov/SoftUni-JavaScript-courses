function string(...args) {
    let total = 0
    args.forEach(x => total += x.length)
    console.log(`${total}\n${Math.floor(total / 3)}`);
}


function operations(...args) {
    let [first, second, sign] = args
    let methods = {
        '+': (x, y) => +x + +y,
        '-': (x, y) => x - y,
        '/': (x, y) => x / y,
        '*': (x, y) => x * y,
        '%': (x, y) => x % y,
        '**': (x, y) => x ** y
    }
    console.log(methods[sign](first, second));
}


function sum(...args) {
    let sum = 0
    for (let i = +args[0]; i <= +args[1]; i++) {
        sum += i
    }
    console.log(sum);
}


function largest(...args) {
    console.log(`The largest number is ${Math.max(...(args.map(Number)))}.`);
}


function circle(input) {
    if (typeof input === 'number') {
        console.log((Math.PI * (input ** 2)).toFixed(2));
    } else {
        console.log(`We can not calculate the circle area, because we receive a ${typeof input}.`);
    }
}


function stars(input = 5) {
    let shape = '* '.repeat(+input).trim()
    for (let i = 1; i < input; i++) {
        shape += '\n' + '* '.repeat(+input).trim()
    }
    console.log(shape);
}


function day(input) {
    let days = {
        'Monday': () => console.log(1),
        'Tuesday': () => console.log(2),
        'Wednesday': () => console.log(3),
        'Thursday': () => console.log(4),
        'Friday': () => console.log(5),
        'Saturday': () => console.log(6),
        'Sunday': () => console.log(7)
    }
    days[input] ? days[input]() : console.log(`error`)
}


function aggregate(input) {
    console.log(input.reduce((a, b) => a + b));
    console.log(input.map(x => 1 / x).reduce((a, b) => a + b));
    console.log(input.join(''));
}


function upper(input) {
    console.log(input.match(/\w+/g).map(x => x.toUpperCase()).join(', '));
}

