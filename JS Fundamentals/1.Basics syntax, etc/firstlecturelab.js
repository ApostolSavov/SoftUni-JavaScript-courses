function by2(par1) {
    let number = par1
    let result = par1 * 2
    console.log(result)
}

function excellent(par1) {
    let grade = par1

    if (grade >= 5.50) {
        console.log(`Excellent`)
    }
    else {
        console.log(`Not excellent`)
    }
}

function to5() {
    for (let i = 1; i <= 5; i++) {
        console.log(i)
    }
}

function numberton(par1) {
    let n = +par1
    let current = n

    while (current > 0) {
        console.log(current)
        current--
    }
}
numberton(5)

function mton(par1, par2) {
    let m = +par1
    let n = +par2

    for (let current = m; current >= n; current--) {
        console.log(current)
    }
}

function student(par1, par2, par3, par4) {
    console.log(`Name: ${par1}, Age: ${par2}, Grade: ${par3.toFixed(2)}`)
}

function month(par1) {
    switch (par1) {
        case 1: console.log(`January`); break
        case 2: console.log(`February`); break
        case 3: console.log(`March`); break
        case 4: console.log(`April`); break
        case 5: console.log(`May`); break
        case 6: console.log(`June`); break
        case 7: console.log(`July`); break
        case 8: console.log(`August`); break
        case 9: console.log(`September`); break
        case 10: console.log(`October`); break
        case 11: console.log(`November`); break
        case 12: console.log(`December`); break
        default: console.log(`Error!`); break
    }
}

function lang(par1) {

    switch (par1) {
        case `England`:
        case `USA`: console.log(`English`); break
        case `Spain`:
        case `Argentina`:
        case `Mexico`: console.log(`Spanish`); break
        default: console.log(`unknown`)
    }
}

function theatre(par1, par2) {
    let day = par1
    let age = +par2
    let price = 0
    let check = false

    if (age >= 0 && age <= 18) {
        switch (day) {
            case "Weekday": price = 12; break
            case "Weekend": price = 15; break
            case "Holiday": price = 5; break
        }
    }
    else if (age > 18 && age <= 64) {
        switch (day) {
            case "Weekday": price = 18; break
            case "Weekend": price = 20; break
            case "Holiday": price = 12; break
        }
    }
    else if (age > 64 && age <= 122) {
        switch (day) {
            case "Weekday": price = 12; break
            case "Weekend": price = 15; break
            case "Holiday": price = 10; break
        }
    }
    else {
        console.log(`Error!`)
        check = true
    }
    if (!check) {
        console.log(price + "$")
    }

}

function onetohun(){

    for (let i = 1; i <= 100; i++){
        if (i%3 === 0){
            console.log(i)
        }
    }
}

function odds(par1){
    let n = +par1
    let counter = 1
    let sum = 0

    for (let i = 1; counter <= n; i++){
        if (i%2 != 0){
            counter++
            sum += i
            console.log(i)
        }
    }
    console.log(`Sum: ${sum}`)
}