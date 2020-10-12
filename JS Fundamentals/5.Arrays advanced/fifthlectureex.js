function train(input) {
    let wagons = input.shift().split(' ')
    let capacity = input.shift().split(' ')

    let operations = (input) => {
        for (let i = 0; i < input.length; i++) {
            let command = input[i].split(' ')
            if (command[0] === 'Add') {
                wagons.push(command[1])
            } else {
                for (let j = 0; j < wagons.length; j++) {
                    if (capacity - wagons[j] >= Number(command[0])) {
                        wagons[j] = Number(wagons[j]) + Number(command[0]) + ''
                        break
                    }
                }
            }
        }

        return wagons
    }

    console.log(operations(input).join(' '));
}

function duplicate(input) {
    let array = input.slice()
    let removeDuplicates = (list) => {
        list = list.filter((x, i, list) => {
            return list.indexOf(x) === i;
        })
        return list
    }

    console.log(removeDuplicates(array).join(' '));
}

function party(input) {
    let array = input.slice()
    let list = []
    let command = []

    let guestGenerator = (array) => {

        for (let i = 0; i < array.length; i++) {
            command = array[i].split(' ')
            let name = command[0]

            if (command.length === 3 && !list.includes(name)) {
                list.push(name)
            } else if (command.length === 3 && list.includes(name)) {
                console.log(`${name} is already in the list!`);
            } else if (!list.includes(name)) {
                console.log(`${name} is not in the list!`);
            } else {
                list = list.filter(x => x !== name)
            }
        }

        return list
    }

    console.log(guestGenerator(array).join('\n'));
}

function sort(input) {
    input.sort((a, b) => b - a)
    let length = input.length
    let array = []
    let num = null

    let rearange = (input) => {
        for (let i = 0; i < length; i++) {

            i % 2 == 0 ? num = input.shift() : num = input.pop()

            array.push(num)
        }

        return array
    }

    console.log(rearange(input).join(' '));
}

function sort2(input) {
    let array = input.slice()
    let sort = (input) => {
        array.sort((a, b) => {
            if (a.length === b.length) return a.localeCompare(b)
            return a.length - b.length
        })
        return array
    }
    console.log(sort(input).join('\n'));
}

function bomb(numbers, bomb) {
    let special = bomb[0]
    let power = bomb[1]
    let array = numbers.slice()

    let detonate = (numbers, special, power) => {
        let spliceStart = null
        let spliceEnd = null
        let i = 0
        while (numbers.includes(special)) {
            if (numbers[i] == special) {
                spliceStart = i - power
                spliceEnd = power * 2 + 1
                if (i - power < 0) {
                    spliceEnd += spliceStart
                    spliceStart = 0
                }
                numbers.splice(spliceStart, spliceEnd)
            } else {
                i++
            }
        }

        return numbers
    }

    let sum = (numbers) => detonate(array, special, power).reduce((a, b) => a + b, 0)

    console.log(sum(numbers));
}


function search(array, command) {
    let numbers = []
    let take = command[0]
    let remove = command[1]
    let target = command[2]
    let count = 0

    let convert = (array) => {
        numbers = array.slice(0, take)
        numbers.splice(0, remove)
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] == target) {
                count++
            }
        }
        return console.log(`Number ${target} occurs ${count} times.`);
    }

    convert(array)

}


function manipulator(a, b) {
    let numbers = a.slice()
    let commands = b.slice()

    let add = (array, index, element) => array.splice(Number(index), 0, Number(element))
    let addMany = (array, index, elements) => array.splice(Number(index), 0, ...elements)
    let contains = (array, element) => console.log(array.indexOf(Number(element)));
    let remove = (array, index) => array.splice(Number(index), 1)
    let shift = (array, positions) => {
        for (let i = 0; i < positions; i++) {
            array.push(array.shift())
        }
    }
    let sumPairs = (array) => {
        let i = 0
        let odd = null
        let flag = false
        if (array.length % 2 != 0) {
            odd = array.pop()
            flag = true
        }
        while (i < array.length) {
            array[i] = Number(array[i]) + Number(array[i + 1])
            array.splice(i + 1, 1)
            i++
        }
        flag ? array.push(odd) : odd = 0
    }
    let print = (array) => console.log(`[ ${array.join(', ')} ]`);

    let operation = ''
    let tempAdd = []
    for (let j = 0; j < commands.length; j++) {
        operation = commands[j].split(' ')

        switch (operation[0]) {
            case 'add': add(numbers, operation[1], operation[2]); break
            case 'addMany': tempAdd = operation.slice(2); addMany(numbers, operation[1], tempAdd.map(Number)); break
            case 'contains': contains(numbers, operation[1]); break
            case 'remove': remove(numbers, operation[1]); break
            case 'shift': shift(numbers, operation[1]); break
            case 'sumPairs': sumPairs(numbers); break
        }

        if (operation[0] == 'print') {
            print(numbers)
            break
        }
    }
}


function gladiator(commands) {
    let inventory = commands[0].slice().split(' ')
    let action = ''
    let equipment = ''
    let upgradeType = ''

    for (let i = 1; i < commands.length; i++) {
        action = commands[i].split(' ')[0]
        equipment = commands[i].split(' ')[1]

        switch (action) {
            case 'Buy': buy(inventory, equipment); break
            case 'Trash': trash(inventory, equipment); break
            case 'Repair': repair(inventory, equipment); break
            case 'Upgrade': {
                upgradeType = equipment.split('-')[1]
                equipment = equipment.split('-')[0]
                upgrade(inventory, equipment, upgradeType)
                break
            }
        }
    }

    console.log(inventory.join(' '));

    function buy(inventory, equipment) {
        if (!inventory.includes(equipment)) {
            inventory.push(equipment)
        }
    }

    function trash() {
        if (inventory.includes(equipment)) {
            inventory = inventory.filter(x => x !== equipment)
        }
    }

    function repair() {
        if (inventory.includes(equipment) && inventory.indexOf(equipment) != inventory.length - 1) {
            inventory.push(...inventory.splice(inventory.indexOf(equipment), 1))

        }
    }

    function upgrade() {
        if (inventory.includes(equipment)) {
            inventory.splice(inventory.indexOf(equipment) + 1, 0, `${equipment}:${upgradeType}`)
        }
    }
}

function wall(input) {
    let sections = input.map(Number)
    let dayConcrete = []
    let dayTemp = null
    let price = (dayConcrete) => dayConcrete.reduce((a, b) => a + b, 0) * 1900

    let build = (sections) => {
        while (sections.some(x => x < 30)) {
            sections = sections.map(x => {
                if (x != 30) {
                    x++
                    dayTemp += 195
                }
                return x
            })
            dayConcrete.push(dayTemp)
            dayTemp = 0
        }

        return dayConcrete
    }

    console.log(build(sections).join(', '));
    console.log(price(dayConcrete) + ' pesos');
}

