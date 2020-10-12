function ages(par) {
    let age = +par

    if (age >= 0 && age <= 2) {
        console.log(`baby`)
    }
    else if (age >= 3 && age <= 13) {
        console.log(`child`)
    }
    else if (age >= 14 && age <= 19) {
        console.log(`teenager`)
    }
    else if (age >= 20 && age <= 65) {
        console.log(`adult`)
    }
    else if (age >= 66) {
        console.log(`elder`)
    }
    else {
        console.log(`out of bounds`)
    }
}

function rounding(par1, par2) {
    let number = +par1
    let precision = +par2
    if (precision > 15) {
        precision = 15
    }
    let rounded = parseFloat(number.toFixed(precision))
    console.log(rounded)

}

function division(par) {
    let number = +par

    if (number % 10 === 0) {
        console.log(`The number is divisible by 10`)
    }
    else if (number % 7 === 0) {
        console.log(`The number is divisible by 7`)
    }
    else if (number % 6 === 0) {
        console.log(`The number is divisible by 6`)
    }
    else if (number % 3 === 0) {
        console.log(`The number is divisible by 3`)
    }
    else if (number % 2 === 0) {
        console.log(`The number is divisible by 2`)
    }
    else {
        console.log(`Not divisible`)
    }
}

function stay(par1, par2, par3) {
    let group = +par1
    let type = par2
    let day = par3
    let price = 0
    let discount = 1


    if (type === "Students") {
        if (group >= 30) {
            discount = 0.85
        }
        switch (day) {
            case `Friday`: price = 8.45; break
            case `Saturday`: price = 9.80; break
            case `Sunday`: price = 10.46; break
        }
    }
    else if (type === "Business") {
        if (group >= 100) {
            group -= 10
        }
        switch (day) {
            case `Friday`: price = 10.90; break
            case `Saturday`: price = 15.60; break
            case `Sunday`: price = 16; break
        }
    }
    else if (type === "Regular") {
        if (group >= 10 && group <= 20) {
            discount = 0.95
        }
        switch (day) {
            case `Friday`: price = 15; break
            case `Saturday`: price = 20; break
            case `Sunday`: price = 22.50; break
        }
    }
    console.log(`Total price: ${(price * group * discount).toFixed(2)}`)
}

function leap(par) {
    let year = +par

    if (year % 4 === 0 && year % 100 != 0) {
        console.log(`yes`)
    }
    else if (year % 400 === 0) {
        console.log(`yes`)
    }
    else {
        console.log(`no`)
    }
}

function countsum(par1, par2) {
    let start = +par1
    let end = +par2
    let sum = 0
    let message = ""

    for (let i = start; i <= end; i++) {
        message += i + " "
        sum += i
    }
    console.log(message)
    console.log(`Sum: ` + sum)
}

function triangle(par) {
    let n = +par
    let message = ""
    let counter = 1

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            message += i + " "
        }
        counter++
        console.log(message)
        message = ""
    }
}

function multi(par) {
    let n = +par

    for (let i = 1; i <= 10; i++) {
        console.log(`${n} x ${i} = ${n * i}`)
    }
}

function login(par) {
    let user = par.shift()
    let password = user.split('').reverse().join('');
    let attempt = ""
    let check = false
    for (let i = 1; i <= 4; i++) {
        attempt = par.shift()
        if (i === 4 && attempt != password) {
            console.log(`User ${user} blocked!`)
            break
        }
        if (attempt === password) {
            console.log(`User ${user} logged in.`)
            check = true
            break
        }
        else if (attempt != password) {
            console.log(`Incorrect password. Try again.`)
        }
    }

}


function pyramid(par1, par2) {
    let base = +par1
    let increment = +par2
    let currentstep = 0
    let stone = 0
    let marble = 0
    let lapis = 0
    let gold = 0
    let counter = 0
    let area = 0
    let innerarea = 0

    for (currentstep = base; currentstep >= 1; currentstep -= 2) {
        counter++
        area = currentstep * currentstep * increment
        innerarea = Math.pow((currentstep - 2), 2) * increment
        if (currentstep === 1 || currentstep === 2) {
            gold += area
            break
        }
        stone += innerarea
        if (counter % 5 === 0) {
            lapis += area - innerarea
        }
        else {
            marble += area - innerarea
        }
    }
    console.log(`Stone required: ${Math.ceil(stone)}`)
    console.log(`Marble required: ${Math.ceil(marble)}`)
    console.log(`Lapis Lazuli required: ${Math.ceil(lapis)}`)
    console.log(`Gold required: ${Math.ceil(gold)}`)
    console.log(`Final pyramid height: ${Math.floor(counter * increment)}`)
}

function bitcoin(input) {
    let lastday = input.length - 1
    let daygrams = 0
    let totalgrams = 0
    let third = 0
    let gramstobitcoin = 0
    let daycounter = 0
    let firstbitcoin = 0
    let firstbitcointrigger = false

    for (let i = 0; i <= lastday; i++) {
        daygrams = input[i]
        third++
        daycounter++
        if (third === 3) {
            daygrams *= 0.7
            third = 0
        }
        totalgrams += +daygrams
        gramstobitcoin = (totalgrams * 67.51) / 11949.16
        if (gramstobitcoin >= 1 && !firstbitcointrigger) {
            firstbitcoin = daycounter
            firstbitcointrigger = true
        }
    }
    if (gramstobitcoin >= 1) {
        console.log(`Bought bitcoins: ${Math.floor(gramstobitcoin)}`)
        console.log(`Day of the first purchased bitcoin: ${firstbitcoin}`)
        console.log(`Left money: ${((gramstobitcoin % 1) * 11949.16).toFixed(2)} lv.`)
    }
    else {
        console.log(`Bought bitcoins: ${Math.floor(gramstobitcoin)}`)
        console.log(`Left money: ${((gramstobitcoin % 1) * 11949.16).toFixed(2)} lv.`)
    }

}

function threenum(par1, par2, par3) {
    let a = [par1, par2, par3]
    let descending = a.sort(function (a, b) { return b - a })
    console.log(descending[0])
    console.log(descending[1])
    console.log(descending[2])
}

function numname(par) {
    let n = +par
    let lastdigit = n % 10
    switch (lastdigit) {
        case 0: console.log(`zero`); break
        case 1: console.log(`one`); break
        case 2: console.log(`two`); break
        case 3: console.log(`three`); break
        case 4: console.log(`four`); break
        case 5: console.log(`five`); break
        case 6: console.log(`six`); break
        case 7: console.log(`seven`); break
        case 8: console.log(`eight`); break
        case 9: console.log(`nine`); break
    }
}

function nextday(par1, par2, par3) {
    let message = new Date(par1, par2, par3)
    let newdate = message.getDate() + 1;
    let newmonth = message.getMonth()
    let newyear = message.getFullYear()
    console.log(`${newyear}-${newmonth}-${newdate}`);
}


function nextDay(y, m, d) {
    let date = new Date(y, m - 1, d);
    let tomorrow = new Date(y, m - 1, date.getDate() + 1);
    console.log(`${tomorrow.getFullYear()}-${tomorrow.getMonth()+1}-${tomorrow.getDate()}`);
}
nextDay (2007,01,27)


function reverse(par) {
    let word = par
    let reversed = word.split(``).reverse(``).join(``)
    console.log(reversed)
}

function coord(par1, par2, par3, par4) {
    let x1 = +par1
    let y1 = +par2
    let x2 = +par3
    let y2 = +par4

    let a = Math.abs(x1 - x2);
    let b = Math.abs(y1 - y2);

    let c = Math.sqrt(a * a + b * b);

    console.log(c)
}



