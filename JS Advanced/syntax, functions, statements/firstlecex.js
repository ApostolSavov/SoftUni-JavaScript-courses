function fruit(...args) {
    console.log(`I need $${((args[1] / 1000) * args[2]).toFixed(2)} to buy ${(args[1] / 1000).toFixed(2)} kilograms ${args[0]}.`);
}


function denominator(a, b) {
    for (let i = Math.min(a, b); i >= 1; i--) {
        if (a % i === 0 && b % i === 0) {
            console.log(i)
            break
        }
    }
}



function same(input) {
    if (input.toString().split('').every(x => x == input % 10)) {
        console.log('true');
    } else {
        console.log('false');
    }
    console.log(input.toString().split('').map(Number).reduce((a, b) => a + b));
}


function walk(...args) {
    let time = Math.round(args[0] * args[1] / (args[2] * 5 / 18)) + Math.trunc((args[0] * args[1]) / 500) * 60
    let hour = Math.trunc(time / 3600);
    let min = Math.trunc((time % 3600) / 60)
    let sec = time % 60
    console.log(`${hour < 10 ? '0' : ''}${hour}:${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`);
}


function speed(input) {
    let limits = {
        motorway: 130,
        interstate: 90,
        city: 50,
        residential: 20
    }
    if (input[0] > limits[input[1]]) {
        if (input[0] - limits[input[1]] <= 20) {
            console.log('speeding');
        } else if (input[0] - limits[input[1]] <= 40) {
            console.log('excessive speeding');
        } else {
            console.log('reckless driving');
        }
    }
}


function cooking(input) {
    let num = +input.shift()
    let commands = {
        chop: () => num /= 2,
        dice: () => num = Math.sqrt(num),
        spice: () => num += 1,
        bake: () => num *= 3,
        fillet: () => num *= 0.8
    }
    input.forEach(x => {
        commands[x]()
        console.log(num)
    })
}


function validity(input) {
    let a = [input[0], input[1]]
    let b = [input[2], input[3]]
    let center = [0, 0]
    let valid = (x, y) => {
        if (Number.isInteger(Math.sqrt((y[0] - x[0]) ** 2 + (y[1] - x[1]) ** 2))) return 'valid'
        else return 'invalid'
    }
    console.log(`{${a.join(', ')}} to {${center.join(', ')}} is ${valid(a, center)}`);
    console.log(`{${b.join(', ')}} to {${center.join(', ')}} is ${valid(b, center)}`);
    console.log(`{${a.join(', ')}} to {${b.join(', ')}} is ${valid(a, b)}`);
}


function calories(input) {
    let object = {}
    for (let i = 0; i < input.length; i += 2) {
        object[input[i]] = +input[i + 1]
    }
    console.log(object);
}


