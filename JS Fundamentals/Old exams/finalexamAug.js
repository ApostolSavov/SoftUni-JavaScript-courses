function imitation(input) {
    let message = input[0].split('')
    let commands = input.slice(1)
    let flag = false
    let temp = []
    let operationsList = {
        Move: x => {
            if (+x >= 0 && +x <= message.length) {
                temp = message.splice(0, Number(x))
                message = message.concat(temp)
            }
        },
        Insert: (x, y) => {
            if (+x >= 0 && +x <= message.length) {
                message.splice(x, 0, y)
                message = message.join('').split('')
            }
        },
        ChangeAll: (x, y) => {
            message = message.join('')
            while (message.includes(x) && y !== x) {
                message = message.replace(x, y)
            }
            message = message.split('')
        }
    }

    for (const command of commands) {
        if (command === 'Decode') {
            flag = true
            break
        }
        let [operation, value1, value2] = command.split('|')
        if (operationsList.hasOwnProperty(operation)) {
            operationsList[operation](value1, value2)
        }

    }

    if (flag) console.log(`The decrypted message is: ${message.join('')}`);

}


function astra(input) {
    let string = input[0]
    let items = []
    let valid
    let pattern = /([|#])(?<name>[A-Za-z\s]+)\1(?<date>\d{2}\/\d{2}\/\d{2})\1(?<calories>\d{1,5})\1/g
    let totalCal = 0

    while ((valid = pattern.exec(string)) !== null) {
        items.push([valid.groups['name'], valid.groups['date'], valid.groups['calories']])
        totalCal += Number(valid.groups['calories'])
    }

    console.log(`You have food to last you for: ${Math.trunc(totalCal / 2000)} days!`);

    for (const item of items) {
        console.log(`Item: ${item[0]}, Best before: ${item[1]}, Nutrition: ${item[2]}`);
    }
}

function pianist(input) {
    let strings = input.slice(1, Number(input[0]) + 1)
    let pieces = {}
    let commands = input.slice(Number(input[0]) + 1, input.length - 1)
    let operations = {
        Add: ((x, y, z) => {
            if (pieces[x]) {
                console.log(`${x} is already in the collection!`);
            } else {
                pieces[x] = { composer: y, key: z }
                console.log(`${x} by ${y} in ${z} added to the collection!`);
            }
        }),
        Remove: (x => {
            if (pieces[x]) {
                delete pieces[x]
                console.log(`Successfully removed ${x}!`);
            } else {
                console.log(`Invalid operation! ${x} does not exist in the collection.`);
            }
        }),
        ChangeKey: ((x, y) => {
            if (pieces[x]) {
                pieces[x]['key'] = y
                console.log(`Changed the key of ${x} to ${y}!`);
            } else {
                console.log(`Invalid operation! ${x} does not exist in the collection.`);
            }
        })
    }

    for (const string of strings) {
        let [piece, composer, key] = string.split('|')
        pieces[piece] = { composer: composer, key: key }
    }

    for (const command of commands) {
        let [operation, value1, value2, value3] = command.split('|')
        operations[operation](value1, value2, value3)
    }

    let sorted = Object.entries(pieces).sort((a, b) => a[0].localeCompare(b[0])).forEach(x => console.log(`${x[0]} -> Composer: ${x[1]['composer']}, Key: ${x[1]['key']}`))
}
