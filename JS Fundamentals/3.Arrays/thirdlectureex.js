function operations(input) {
    let newarray = []
    let sum1 = 0
    let sum2 = 0
    for (let i = 0; i < input.length; i++) {
        sum1 += +input[i]
        input[i] % 2 !== 0 ? newarray[i] = input[i] - i : newarray[i] = input[i] + i
        sum2 += +newarray[i]
    }
    console.log(newarray);
    console.log(sum1);
    console.log(sum2);
}

function compare(a, b) {
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
            if (a[i] === b[j]) console.log(b[j])
        }
    }
}

function merge(a, b) {
    let c = []
    for (let i = 0; i < a.length; i++) {
        i % 2 !== 0 ? c.push(a[i] + `` + b[i]) : c.push(+a[i] + +b[i])
    }
    console.log(c.join(` - `));
}

function rotation(a, b) {
    for (let i = 0; i < b; i++) {
        let c = a.shift()
        a.push(c)
    }
    console.log(a.join(` `));
}

function max(a) {
    let flag = false
    let text = ``
    for (let i = 0; i < a.length; i++) {
        for (let j = i + 1; j < a.length; j++) {
            if (a[i] <= a[j]) {
                flag = true
                break
            }
        }
        if (!flag) text += (a[i]) + ` `
        flag = false
    }
    console.log(text);
}

function equal(a) {
    let sumleft = 0
    let sumright = 0
    let flag = false

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < i; j++) {
            sumleft += +a[j]
        }
        for (let k = a.length - 1; k > i; k--) {
            sumright += +a[k]
        }
        if (sumright === sumleft) {
            console.log(i);
            flag = true
        }
        sumleft = sumright = 0
    }
    if (!flag) console.log(`no`);
}

function sequence(a) {
    let curr = ``
    let high = ``
    for (let i = 0; i < a.length; i++) {
        if (i === 0 && a[i] === a[i + 1]) {
            curr += a[i] + ` `
        }
        if (a[i] === a[i - 1] || a[i] === a[i + 1]) {
            if (a[i] !== a[i - 1]) {
                curr = ``
            }
            curr += a[i] + ` `
        }
        else if (curr.length > high.length) {
            high = curr
            curr = ``
        }
        else {
            curr = ``
        }
    }
    console.log(high);
}


function magic(a, b) {
    let duplicatearray = []
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length; j++) {
            if (Number(a[i]) + Number(a[j]) === Number(b) && i !== j && !duplicatearray.includes(a[i]) && !duplicatearray.includes(a[j])) {
                console.log(a[i] + ` ` + a[j]);
                duplicatearray.push(a[i], a[j])
            }
        }
    }
}



function magic1(a, b) {
    let duplicatearray = []
    a = a.map(x => Number(x))
    b = Number(b)
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length; j++) {
            if (a[i] + a[j] === b && i !== j && !duplicatearray.includes(a[i]) && !duplicatearray.includes(a[j])) {
                console.log(a[i] + ` ` + a[j]);
                duplicatearray.push(a[i], a[j])
            }
        }
    }
}


function dungeon(input) {
    let array = input[0].split(`|`)
    let health = 100
    let coins = 0
    let breakflag = false
    let counter = 0

    for (let i = 0; i < array.length; i++) {
        let subarray = array[i].split(` `)
        switch (subarray[0]) {
            case "potion": health += +subarray[1]
                if (health > 100) {
                    let difference = health - 100
                    health = 100
                    console.log(`You healed for ${subarray[1] - difference} hp.`)
                    console.log(`Current health: ${health} hp.`)
                    counter++
                } else {
                    console.log(`You healed for ${subarray[1]} hp.`)
                    console.log(`Current health: ${health} hp.`)
                    counter++
                } break
            case "chest": coins += +subarray[1];
                console.log(`You found ${subarray[1]} coins.`)
                counter++
                break
            default: health -= +subarray[1];
                if (health > 0) {
                    console.log(`You slayed ${subarray[0]}.`)
                    counter++
                } else {
                    console.log(`You died! Killed by ${subarray[0]}.`)
                    counter++
                    console.log(`Best room: ${counter}`)
                    breakflag = true
                }
        }
        if (breakflag) break
    }
    if (!breakflag) {
        console.log(`You've made it!`);
        console.log(`Coins: ${coins}`);
        console.log(`Health: ${health}`);
    }
}

function ladybug(array) {
    let field = []
    field.length = +array[0]
    let indexes = array[1].split(` `)
    let commands = []
    let innercounter = 0
    let final = []
    for (let i = 0; i < field.length; i++) {
        let j = 0
        if (indexes.includes(i+``)) {
            field[+indexes[j]] = `ladybug`
            j++
        }
        else {
            field[i] = `empty`
        }
    }
    for (let i = 2; i < array.length; i++) {
        commands = array[i].split(` `)
        if (field[commands[0]] === `ladybug`) {
            if (commands[1] === `right`) {
                field[commands[0]] = `empty`
                if (+commands[2] < 0) {
                    field[commands[0]] = `empty`
                    for (let j = field[commands[0]]; j >= 0; j--) {
                        if (j < 0) {
                            break
                        }
                        else if (innercounter === +commands[2] && field[j] === `empty`) {
                            field[j] = `ladybug`
                        }
                        else if (field[j] === `ladybug`) {
                            continue
                        }
                        innercounter++
                    }
                }
                else {
                    for (let j = field[commands[0]]; j < field.length; j++) {
                        if (j >= field.length) {
                            break
                        }
                        else if (innercounter === +commands[2] && field[j] === `empty`) {
                            field[j] = `ladybug`
                        }
                        else if (field[j] === `ladybug`) {
                            continue
                        }
                        innercounter++
                    }
                }
            }
            else if (commands[1] === `left`) {
                field[commands[0]] = `empty`
                if (+commands[2] < 0) {
                    for (let j = field[commands[0]]; j < field.length; j++) {
                        if (j >= field.length) {
                            break
                        }
                        else if (innercounter === +commands[2] && field[j] === `empty`) {
                            field[j] = `ladybug`
                        }
                        else if (field[j] === `ladybug`) {
                            continue
                        }
                        innercounter++
                    }
                }
                else {
                    for (let j = field[commands[0]]; j >= 0; j--) {
                        if (j < 0) {
                            break
                        }
                        else if (innercounter === +commands[2] && field[j] === `empty`) {
                            field[j] = `ladybug`
                        }
                        else if (field[j] === `ladybug`) {
                            continue
                        }
                        innercounter++
                    }
                }
                innercounter = 0
            }
            for (let i = 0; i < field.length; i++) {
                if (field[i] === `ladybug`) {
                    final[i] = `1 `
                }
                else {
                    final[i] = `0 `
                }
            }

            console.log(final.join(``));
        }
    }
}

ladybug([`5`, '3', '3 left 2', '1 left -2'])

function Ladybug(input){
    
}