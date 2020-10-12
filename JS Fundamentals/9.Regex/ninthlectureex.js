function furniture(input) {
    let data = input.slice(0, input.length - 1).join(' ')
    let pattern = />>(?<name>[a-zA-Z]+)<<(?<price>\d+\.*\d+)!(?<quant>\d+)/g
    let valid = []
    let totalPrice = 0
    let furniture = []

    while ((valid = pattern.exec(data)) !== null) {
        let name = valid.groups['name']
        let price = Number(valid.groups['price'])
        let quantity = Number(valid.groups['quant'])
        totalPrice += price * quantity
        furniture.push(name)
    }

    console.log('Bought furniture:');
    for (const name of furniture) {
        console.log(name);
    }
    console.log(`Total money spend: ${(totalPrice).toFixed(2)}`);
}


function race(input) {
    let names = input.shift().split(', ')
    let strings = input.slice(0, input.length - 1).join(' ')
    let racers = {}

    let patternClean = /[^a-zA-Z\d\s]+/g
    let patternNum = /[\d]/g
    let patternAlpha = /[A-Za-z]/g

    let cleanString = strings.replace(patternClean, '').split(' ')

    for (let i = 0; i < cleanString.length; i++) {
        const element = cleanString[i]
        let tempName = element.match(patternAlpha).join('')
        if (names.includes(tempName)) {
            let tempNum = element.match(patternNum).map(Number).reduce((a, b) => a + b, 0)
            racers[tempName] = racers[tempName] ? racers[tempName] + tempNum : tempNum
        }
    }

    let sortedRacers = Object.entries(racers).sort((a, b) => b[1] - a[1])

    console.log(`1st place: ${sortedRacers[0][0]}`);
    console.log(`2nd place: ${sortedRacers[1][0]}`);
    console.log(`3rd place: ${sortedRacers[2][0]}`);
}


function bar(input) {
    let customers = input.slice(0, input.length - 1)
    let pattern = /%(?<name>[A-Z][a-z]+)%[^|$%.]*?<(?<prod>\w+)>[^|$%.]*?\|(?<count>[\d]+)\|[^|$%.]*?(?<price>[\d]+.*?[\d]*)\$/
    let curr = []
    let totalMoney = 0

    for (let i = 0; i < customers.length; i++) {
        if ((curr = pattern.exec(customers[i])) !== null) {
            let personMoney = curr.groups['count'] * curr.groups['price']
            totalMoney += Number(personMoney)
            console.log(`${curr.groups['name']}: ${curr.groups['prod']} - ${(personMoney).toFixed(2)}`)
        }
    }
    console.log(`Total income: ${(totalMoney).toFixed(2)}`);
}


function enigma(input) {
    let strings = input.slice(1, input.length)
    const letterPattern = /[STARstar]/g
    const groupsPattern = /[^-@:>!]*?@(?<name>[A-Za-z]+)[^-@:>!]*?:(?<pop>\d+)[^-@:>!]*?!(?<attack>[AD])![^-@:>!]*?->(?<army>\d+)[^-@:>!]*?/
    let tempStr = ''
    let attacked = []
    let destroyed = []

    for (let i = 0; i < strings.length; i++) {
        let string = strings[i];
        const count = ((string || '').match(letterPattern) || []).length

        for (const char of string) {
            tempStr += String.fromCharCode(Math.max(char.charCodeAt(0) - count, 0))
        }

        let valid = groupsPattern.exec(tempStr)

        if (valid) {
            if (valid.groups['attack'] === 'A') {
                attacked.push({
                    planet: valid.groups['name'],
                    population: valid.groups['pop'],
                    attack: valid.groups['attack'],
                    army: valid.groups['army']
                })
            } else if (valid.groups['attack'] === 'D') {
                destroyed.push({
                    planet: valid.groups['name'],
                    population: valid.groups['pop'],
                    attack: valid.groups['attack'],
                    army: valid.groups['army']
                })
            }
        }

        tempStr = ''
    }

    console.log(`Attacked planets: ${attacked.length}`);
    attacked.sort((a, b) => a.planet.localeCompare(b.planet)).forEach(a => {
        console.log(`-> ${a.planet}`);
    })
    console.log(`Destroyed planets: ${destroyed.length}`);
    destroyed.sort((a, b) => a.planet.localeCompare(b.planet)).forEach(a => {
        console.log(`-> ${a.planet}`);
    })
}



function nether(input) {
    let demons = input[0].split(/[,\s]+/g)
    let nameCheck = /[\s,]/
    let patternHP = /[^0-9-+*\/.]/g
    let patternDmg = /([+|-]?[0-9]+[.]*?[0-9]+|[+|-]?[0-9]+)/g
    let patternSigns = /[*\/]/g
    let demonList = {}
    let signList = {
        '*': x => x * 2,
        '/': x => x / 2
    }

    for (const demon of demons) {
        if (nameCheck.test(demon)) {
            continue
        }
        let currHP = 0
        let currDmg = 0
        let currSigns = null

        if (demon.match(patternHP) !== null) currHP = demon.match(patternHP).map(x => x.charCodeAt(0)).reduce((a, b) => a + b, 0)

        if (demon.match(patternDmg) !== null) currDmg = demon.match(patternDmg).map(Number).reduce((a, b) => a + b, 0)

        currSigns = demon.match(patternSigns)

        if (currSigns !== null) {
            for (const sign of currSigns) {
                currDmg = signList[sign](currDmg)
            }
        }
        demonList[demon] = [currHP, currDmg]
    }

    Object.entries(demonList).sort((a, b) => a[0].localeCompare(b[0])).forEach(x => {
        console.log(`${x[0]} - ${x[1][0]} health, ${(x[1][1].toFixed(2))} damage`);
    })
}


function email(input) {
    let string = input[0]
    let pattern = / ([A-Za-z0-9][A-Za-z0-9]?|[A-Za-z0-9][\w._-]*\w)@(([A-Za-z][A-Za-z]*|[A-Za-z][A-Za-z-]*[A-Za-z])\.([A-Za-z][A-Za-z]*|[A-Za-z][A-Za-z-]*[A-Za-z]))(\.([A-Za-z][A-Za-z]*|[A-Za-z][A-Za-z-]*[A-Za-z]))*/gm

    if (string.match(pattern) === null) return

    string.match(pattern).forEach(x => { if (x !== '' && x !== null) console.log(x) })
}

