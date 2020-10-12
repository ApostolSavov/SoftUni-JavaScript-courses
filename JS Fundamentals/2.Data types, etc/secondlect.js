function concat(first, second, delimeter) {
    let result = `${first}${delimeter}${second}`
    console.log(result)
}

function changechar(string1, char, string2) {
    let startword = string1
    let newletter = char
    let comparisonword = string2
    let newword = ""

    for (let i = 0; i < startword.length; i++) {
        if (startword[i] === "_") {
            newword += newletter
        }
        else {
            newword += startword[i]
        }
    }
    if (newword === comparisonword) {
        console.log(`Matched`)
    }
    else {
        console.log(`Not Matched`)
    }
}

function typeofnum(par1, par2, par3) {
    let sum = par1 + par2 + par3
    let type = ""
    sum % 1 === 0 ? type = "Integer" : type = "Float"
    console.log(`${sum} - ${type}`)
}

function amazingnum(par) {
    let number = par + ""
    let sum = 0
    for (let i = 0; i < number.length; i++) {
        sum += +number[i]
    }
    let check = sum.toString().includes(9)
    let message = ""
    check ? message = "True" : message = "False"
    console.log(`${number} Amazing? ${message}`)
}


function gramophone(par1, par2, par3) {
    let band = par1
    let album = par2
    let song = par3
    let songduration = (band.length * album.length * song.length) / 2
    let rotations = Math.ceil(songduration / 2.5)
    console.log(`The plate was rotated ${rotations} times.`)
}



function fuel(par1,par2,par3){
    let distance = +par1
    let passengers = +par2
    let fuelprice = +par3
    let neededfuel = (distance/100)*7
    neededfuel += passengers*0.100
    let money = fuelprice * neededfuel
    console.log(`Needed money for that trip is ${money}lv.`)
}

function centuries(par){
    let initial = +par
    let years = initial*100
    let days = Math.trunc(years*365.2422)
    let hours = days*24
    let minutes = hours*60

    console.log(`${initial} centuries = ${years} years = ${days} days = ${hours} hours = ${minutes} minutes`)
}

function special2(par){
    let n = +par
    let sum = 0

    for (let i = 1; i <= n; i++){
        i = i.toString()
        for (let j = 0; j < i.length; j++){
            sum += +i[j]
        }
        if (sum === 5 || sum === 7 || sum === 11){
            console.log(`${i} -> True`)
        }
        else {
            console.log(`${i} -> False`)
        }
        sum = 0
    }
}

function alphabet(par){
    let n = +par
    let letters = "ABCDEFGHIKLMNOPQRSTVXYZ".toLowerCase()

    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            for (let k = 0; k < n; k++){
                console.log(`${letters[i]}${letters[j]}${letters[k]}`)
            }
        }
    }
}
