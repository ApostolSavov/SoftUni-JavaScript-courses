function occurence(input) {
    let words = input.shift().split(' ')
    let wordMap = new Map()
    for (const word of words) {
        wordMap.set(word, 0)
    }

    for (const word of input) {
        if (wordMap.has(word)) {
            wordMap.set(word, wordMap.get(word) + 1)
        }
    }

    sortedWords = Array.from(wordMap).sort((a, b) => {
        return b[1] - a[1]
    })

    for (const [word, count] of sortedWords) {
        console.log(`${word} - ${count}`);
    }
}



function odd(input) {
    let map = new Map()
    let list = input.split(' ').map(x => x.toLowerCase())
    let string = ''

    for (const word of list) {
        if (map.has(word)) {
            map.set(word, map.get(word) + 1)
        } else {
            map.set(word, 1)
        }
    }

    for (const [key, value] of map) {
        if ((value % 2) !== 0) {
            string += key + ' '
        }
    }

    console.log(string);
}


function piccolo(input) {
    let register = []
    for (const entry of input) {

        let [command, car] = entry.split(', ')
        switch (command) {
            case "IN": carIn(car); break
            case "OUT": carOut(car); break
        }
    }

    function carIn(number) {
        if (!(register.includes(number)))
            register.push(number)
    }

    function carOut(number) {
        if (register.includes(number)) {
            register.splice(register.indexOf(number), 1)
        }
    }

    register = register.sort((a, b) => a.localeCompare(b))

    if (register.length !== 0) {
        for (const car of register) {
            console.log(car);
        }
    } else {
        console.log("Parking Lot is Empty");
    }
}



function party(input) {
    let regular = []
    let vip = []
    let partyIndex = 0

    for (const guest of input) {
        if (guest == "PARTY") {
            partyIndex = input.indexOf(guest)
            break
        }
        if ((typeof Number(guest[0])) == 'number') {
            vip.push(guest)
        } else {
            regular.push(guest)
        }

    }

    for (let i = partyIndex + 1; i < input.length; i++) {
        if (regular.includes(input[i])) {
            regular.splice(regular.indexOf(input[i]), 1)
        } else if (vip.includes(input[i])) {
            vip.splice(vip.indexOf(input[i]), 1)
        }
    }

    console.log(`${vip.length + regular.length}`);
    for (const guest of vip) {
        if (vip.length == 0) {
            break
        } else {
            console.log(guest);
        }
    }
    for (const guest of regular) {
        if (regular.length == 0) {
            break
        } else {
            console.log(guest);
        }
    }
}


function card(input) {
    let register = new Map()
    let deckInfo = new Map()
    deckInfo.set('J', 11)
    deckInfo.set('Q', 12)
    deckInfo.set('K', 13)
    deckInfo.set('A', 14)
    deckInfo.set('S', 4)
    deckInfo.set('H', 3)
    deckInfo.set('D', 2)
    deckInfo.set('C', 1)
    for (const command of input) {
        let [person, deck] = command.split(': ')
        deck = deck.split(', ')
        if (register.has(person)) {
            register.set(person, register.get(person).concat(deck))
        } else {
            register.set(person, deck)
        }
    }

    for (const [key, value] of register) {
        register.set(key, filter(value))
    }

    for (const [key, value] of register) {
        console.log(`${key}: ${sum(value)}`);
    }

    function filter(array) {
        array = array.filter((item, pos) => {
            return array.indexOf(item) == pos
        })

        return array
    }

    function sum(array) {
        let sum = 0
        for (const card of array) {
            let type = card.slice(-1)
            let power = card.slice(0, card.length - 1)
            if (power[0] >= '0' && power[0] <= '9') {
                power = Number(power)
            } else {
                power = deckInfo.get(power)
            }
            type = deckInfo.get(type)
            sum += power * type
        }
        return sum
    }
}


function travel(input) {
    let list = new Map()
    let townList = new Map()

    for (const index of input) {
        let [country, town, price] = index.split(' > ')

        if (list.has(country) && list.get(country).has(town)) {
            list.get(country).set(town, Math.min(list.get(country).get(town), +price))
        } else if (list.has(country)) {
            list.set(country, list.get(country).set(town, price))
        } else {
            townList.set(town, price)
            list.set(country, townList)
            townList = new Map()
        }
    }

    let sorted = Array.from(list).sort((a, b) => a[0].localeCompare(b[0]))

    for (let dest of sorted) {
        dest = Object.fromEntries(Array.from(dest[1]).sort((a, b) => a[1] - b[1]))
    }

    for (const place of sorted) {
        let tempArr = Array.from(place[1])
        console.log(`${place[0]} -> ${sort(tempArr)}`);
    }

    function sort(array) {
        let string = ''
        array = array.sort((a, b) => a[1] - b[1])
        for (const [country, price] of array) {
            string += `${country} -> ${price} `
        }
        return string
    }
}


function employer(input) {
    let list = new Map()
    let set = new Set()

    for (const string of input) {
        let [company, employee] = string.split(' -> ')
        if (list.has(company)) {
            list.set(company, list.get(company).add(employee))
        } else {
            list.set(company, new Set([employee]))
        }
    }

    let sortedList = Object.fromEntries(Array.from(list).sort((a, b) => a[0].localeCompare(b[0])))

    for (const company in sortedList) {
        console.log(`${company}`);
        for (const employee of sortedList[company]) {
            console.log(`-- ${employee}`);
        }
    }
}



function resource(input) {
    let map = new Map()

    for (let i = 0; i < input.length; i += 2) {
        if (map.has(input[i])) {
            map.set(input[i], +map.get(input[0]) + +input[i + 1])
        } else {
            map.set(input[i], input[i + 1])
        }
    }

    for (const [resource, quantity] of map) {
        console.log(`${resource} -> ${quantity}`);
    }
}


function arena(input) {
    let arena = new Map()
    let dead = false

    for (const string of input) {
        dead = false
        if (string == "Ave Cesar") {
            break
        }

        if (string.includes(' -> ')) {
            let [gladiator, technique, skill] = string.split(' -> ')
            if (arena.has(gladiator)) {
                if (arena.get(gladiator).has(technique)) {
                    arena.get(gladiator).set(technique, Math.max(Number(skill), Number(arena.get(gladiator).get(technique))))
                } else {
                    arena.get(gladiator).set(technique, Number(skill))
                }

            } else {
                arena.set(gladiator, new Map().set(technique, +skill))
            }
        } else if (string.includes(' vs ')) {
            let [gladiator1, gladiator2] = string.split(' vs ')
            if (arena.has(gladiator1) && arena.has(gladiator2) && gladiator1 != gladiator2) {
                for (const [technique1, skill1] of arena.get(gladiator1)) {
                    for (const [technique2, skill2] of arena.get(gladiator2)) {
                        compareTech(technique1, technique2, skill1, skill2, gladiator1, gladiator2, arena)
                        if (dead) {
                            break
                        }
                    }
                    if (dead) {
                        break
                    }
                }
            }
        }
    }

    function compareTech(tech1, tech2, skill1, skill2, glad1, glad2, map) {
        if (tech1 == tech2) {
            if (skill1 > skill2) {
                map.delete(glad2)
                dead = true
            } else if (skill1 < skill2) {
                map.delete(glad1)
                dead = true
            }
        }
    }

    for (const [gladiator, techniques] of arena) {
        let totalSkill = 0
        for (const [technique, skill] of techniques) {
            totalSkill += +skill
        }
        techniques.set('*TotalSkill', totalSkill)
    }

    let firstSort = Array.from(arena).sort((a, b) => {
        return b[1].get('*TotalSkill') - a[1].get('*TotalSkill') || a[0].localeCompare(b[0])
    })

    let tempIndex = 0

    for (let [glad, tech] of firstSort) {
        let innerSort = Array.from(tech).sort((a, b) => {
            return b[1] - a[1] || a[0].localeCompare(b[0])

        })
        firstSort[tempIndex][1] = innerSort
        tempIndex++
    }

    for (const [glad, tech] of firstSort) {
        console.log(`${glad}: ${tech[0][1]} skill`);
        for (let i = 1; i < tech.length; i++) {
            console.log(`- ${tech[i][0]} <!> ${tech[i][1]}`);
        }
    }
}



function legendary(input) {
    let legendaryMap = new Map()
    legendaryMap.set('shards', 'Shadowmourne')
    legendaryMap.set('fragments', 'Valanyr')
    legendaryMap.set('motes', 'Dragonwrath')

    let materials = input.split(' ').map(x => x.toLowerCase())
    let materialsReg = new Map()
    let keyMaterials = ['shards', 'fragments', 'motes']
    let firstMaterial = ''
    let legendaryItem = ''

    for (let i = 0; i < materials.length; i += 2) {

        if (materialsReg.has(materials[i + 1])) {
            materialsReg.set(materials[i + 1], materialsReg.get(materials[i + 1]) + +(materials[i]))
        } else {
            materialsReg.set(materials[i + 1], +materials[i])
        }

        if (materialsReg.get(materials[i + 1]) >= 250 && keyMaterials.includes(materials[i + 1])) {
            materialsReg.set(materials[i + 1], materialsReg.get(materials[i + 1]) - 250)
            firstMaterial = materials[i + 1]
            break
        }
    }

    legendaryItem = legendaryMap.get(firstMaterial)
    console.log(`${legendaryItem} obtained!`);

    let filteredKey = Array.from(materialsReg).filter((x) => keyMaterials.includes(x[0]))

    let sortedJunk = Array.from(materialsReg).filter((x) => !keyMaterials.includes(x[0])).sort((a, b) => a[0].localeCompare(b[0]))

    let tempArr = []

    for (const [mat, quant] of filteredKey) {
        tempArr.push(mat)
    }

    if (filteredKey.length < 3) {

        for (const keyMat of keyMaterials) {
            if (!tempArr.includes(keyMat)) {
                filteredKey.push([keyMat, 0])
            }
        }
    }

    sortedKey = filteredKey.sort((a, b) => {

        if (b[1] == a[1]) {
            return a[0].localeCompare(b[0])
        } else {
            return b[1] - a[1]
        }

    })

    for (const [mat, quant] of sortedKey) {
        console.log(`${mat}: ${quant}`);
    }

    for (const [mat, quant] of sortedJunk) {
        console.log(`${mat}: ${quant}`);
    }
}



function foo(arr) {
    let key = {
        shards: 0,
        motes: 0,
        fragments: 0,
    }
    const legendaries = {
        shards: "Shadowmourne",
        fragments: "Valanyr",
        motes: "Dragonwrath",
    }
    let junk = {}
    let winner = undefined
    arr = arr.match(/\d+ +\w+/g)
    for (let i = 0; i < arr.length; i++) {
        const [value, material] = arr[i].split(" ").map(x => x.toLowerCase())
        if (key[material] !== undefined) {
            key[material] += Number(value)
            if (key[material] >= 250) {
                winner = legendaries[material]
                key[material] = key[material] - 250
                break
            }
        } else {
            junk[material] = (junk[material] === undefined ? 0 : junk[material]) + Number(value)
        }
    }

    key = Object.entries(key).sort((x, y) => (y[1] - x[1] !== 0 ? y[1] - x[1] : x[0].localeCompare(y[0])))
    junk = Object.entries(junk).sort((x, y) => x[0].localeCompare(y[0]))

    console.log(`${winner} obtained!`)
    key.forEach(x => console.log(`${x[0]}: ${x[1]}`))
    if (Object.keys(junk).length !== 0) junk.forEach(x => console.log(`${x[0]}: ${x[1]}`))
}

foo(
    '123 silver 6 shards 8 shards 5 motes 9 fangs 75 motes 103 MOTES 8 Shards 86 Motes 7 stones 19 silver'
)