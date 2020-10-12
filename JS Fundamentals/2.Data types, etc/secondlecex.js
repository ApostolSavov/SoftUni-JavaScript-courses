function sumofnum(par){
    let string = par.toString()
    let sum = null
    for (let i = 0; i < string.length; i++){
        sum += +string[i]
    }
    console.log(sum)
}

function combine(par1,par2,par3){
    let args = [par1,par2,par3]
    let string = ""
    for (let i = 0; i < args.length; i++){
        string += args[i].toString()
    }
    console.log(string)
}

function towninfo(par1,par2,par3){
    let name = par1
    let population = par2
    let area = par3
    console.log(`Town ${name} has population of ${population} and area ${area} square km.`)
}

function kmconvert(par){
    let dist = +par
    let tokm = dist*0.001
    console.log(tokm.toFixed(2))
}

function poundtodollar(par){
    let dollars = +par*1.31
    console.log(dollars.toFixed(3))
}

function revert(par1,par2,par3){
    let string = [par1,par2,par3]
    
    console.log(string.reverse().join(` `))
}

function revert1(par1,par2,par3){
    let string = Array.from(arguments).reverse()
    console.log(string.join(` `))
}

function lowercase(par){
    let char = par
    let char2 = char.toUpperCase()

    if (char === char2){
        console.log(`upper-case`)
    }
    else {
        console.log(`lower-case`);
    }
}

function calculator(par1,par2,par3){
    let num = +par1
    let operator = par2
    let othernum = +par3
    switch (operator){
        case "+" : console.log((num+othernum).toFixed(2)); break
        case "-" : console.log((num-othernum).toFixed(2)); break
        case "*" : console.log((num*othernum).toFixed(2)); break
        case "/" : console.log((num/othernum).toFixed(2)); break
        case "%" : console.log((num%othernum).toFixed(2)); break
    }
}


function test(par){
let a = par
let c = 5
let d = 2
let b = eval(`${c}${a}${d}`)
console.log(b)
}


function gladiator(a,b,c,d,e){
    let lostfights = +a
    let helmetprice = +b
    let swordprice = +c
    let shieldprice = +d
    let armorprice = +e
    let helmetcount = null
    let swordcount = null
    let armorcount = null
    let shieldcount = null
    let finalprice = null

    for (let i = 1; i <= lostfights; i++){
        helmetcount++ 
        swordcount++
        if (helmetcount === 2 && swordcount === 3){
            finalprice += helmetprice + swordprice + shieldprice
            helmetcount = swordcount = 0
            shieldcount++
            if (shieldcount === 2){
                finalprice += armorprice
                shieldcount = 0
            }
            continue
        }
        if (helmetcount === 2){
            finalprice += helmetprice
            helmetcount = 0
        }
        if (swordcount === 3){
            finalprice += swordprice
            swordcount = 0
        }
    }
    console.log(`Gladiator expenses: ${finalprice.toFixed(2)} aureus`);
}

function spice(par){
    let yield = +par
    let extracted = null
    let count = n0

    for (let i = yield; i >= 100; i -= 10){
        if (i < 100){
            break
        }
        extracted += i
        if (extracted >= 26){
            extracted -= 26
        }
        else {
            extracted = 0
        }
        count++
    }
    if (extracted >= 26){
        extracted -= 26
    }
    else {
        extracted = 0
    }
    console.log(count)
    console.log(extracted);
}
