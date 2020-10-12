function info(first, last, age) {
    let object = {
        firstName: first,
        lastName: last,
        age: age
    }

    for (let key in object) {
        console.log(`${key}: ${object[key]}`);
    }
}

function city(name, area, population, country, postCode) {

    let cityObj = {
        name,
        area,
        population,
        country,
        postCode
    }

    let cityArr = Object.entries(cityObj)

    for (const [key, value] of cityArr) {
        console.log(`${key} -> ${value}`);
    }
}

function json(string) {
    let object = Object.entries(JSON.parse(string))

    for (const [key, value] of object) {
        console.log(`${key}: ${value}`);
    }
}


function stringify(name, lastName, hairColor) {
    let object = {
        name,
        lastName,
        hairColor
    }

    console.log(JSON.stringify(object));
}


function cat(input) {
    class Cat {
        constructor(name, age) {
            this.name = name
            this.age = age
            this.meow = function () {
                console.log(`${this.name}, age ${this.age} says Meow`);
            }
        }
    }

    let object = {}
    let tempArr = []

    let generate = (input) => {
        for (const index in input) {
            tempArr = input[index].split(' ')
            object = new Cat(tempArr[0], tempArr[1])
            object.meow()
        }
    }

    generate(input)
}


function song(input) {
    let amount = input.shift()
    let type = input.pop()
    class Song {
        constructor(typeList, name, time) {
            this.typeList = typeList
            this.name = name
            this.time = time
        }
    }

    let object = {}
    let temp = []

    for (let index in input) {
        temp = input[index].split('_')
        object = new Song(temp[0], temp[1], temp[2])
        if (object.typeList == type) console.log(object.name);
        else if (type == 'all') console.log(object.name);
    }
}

function employee(input) {
    class Person {
        constructor(name, number) {
            this.name = name
            this.number = number
        }
    }

    let person = {}

    for (const index in input) {
        person = new Person(input[index], input[index].length)
        console.log(`Name: ${person.name} -- Personal Number: ${person.number}`);
    }
}

function towns(input) {
    let tempArr = []
    let object = {}

    for (let index in input) {
        tempArr = input[index].split(' | ')
        object = {
            town: tempArr[0],
            latitude: Number(tempArr[1]).toFixed(2),
            longitude: Number(tempArr[2]).toFixed(2)
        }
        console.log(object)
    }
}

function store(stock, order) {
    let stockObj = {}

    for (let i = 0; i < stock.length; i += 2) {
        stockObj[stock[i]] = Number(stock[i + 1])
    }

    for (let i = 0; i < order.length; i += 2) {
        if (stockObj.hasOwnProperty(order[i])) {
            stockObj[order[i]] += Number(order[i + 1])
        } else {
            stockObj[order[i]] = Number(order[i + 1])
        }
    }

    for (let key in stockObj) {
        console.log(`${key} -> ${stockObj[key]}`);
    }
}


function movies(input) {
    let array = []
    let index = 0
    let command = []

    let commandSwitch = (input) => {
        switch (true) {
            case command.includes('addMovie'): add(command); break
            case command.includes('directedBy'): by(command); break
            case command.includes('onDate'): date(command); break
        }
    }

    let arrayIterator = (input) => {
        for (let i = 0; i < input.length; i++) {
            command = input[i].split(' ')
            commandSwitch(input)
        }
    }

    function add(command) {
        array[index] = {
            name: command.slice(1).join(" ")
        }
        index++
    }

    function by(command) {
        command = command.join(' ').split(' directedBy ')
        for (let j = 0; j < array.length; j++) {
            if (array[j].name == command[0]) {
                array[j].director = command[1]
            }
        }
    }

    function date(command) {
        command = command.join(' ').split(' onDate ')
        for (let j = 0; j < array.length; j++) {
            if (array[j].name == command[0]) {
                array[j].date = command[1]
            }
        }
    }

    arrayIterator(input)

    for (let movie in array) {
        if (array[movie].hasOwnProperty('director') && array[movie].hasOwnProperty('date'))
            console.log(JSON.stringify(array[movie]));
    }

}

function inventory(input) {
    let tempArr = []
    let register = []

    for (let i = 0; i < input.length; i++) {
        tempArr = input[i].split(' / ')

        register[i] = {
            name: tempArr[0],
            level: Number(tempArr[1]),
            items: tempArr[2].split(', ').sort((a, b) => a.localeCompare(b))
        }
    }

    register.sort((a, b) => a.level - b.level)

    for (let hero in register) {
        console.log(`Hero: ${register[hero].name}`);
        console.log(`level => ${register[hero].level}`);
        console.log(`items => ${register[hero].items.join(', ')}`);
    }
}



function dictionary(input) {
    let dictionary = {}
    let sortArr = []
    let tempArr = null
    for (let i = 0; i < input.length; i++) {
        tempArr = Object.entries(JSON.parse(input[i]))

        dictionary[tempArr[0][0]] = tempArr[0][1]
    }

    sortArr = Object.entries(dictionary).sort((a, b) => a[0].localeCompare(b[0]))

    dictionary = {}

    for (let [key, value] of sortArr) {
        dictionary[key] = value
    }

    for (let key in dictionary) {
        console.log(`Term: ${key} => Definition: ${dictionary[key]}`);
    }
}

class Vehicle {
    constructor(type, model, parts, fuel) {
        this.type = type
        this.model = model
        this.parts = {
            engine: parts.engine,
            power: parts.power,
            quality: parts.engine * parts.power
        }
        this.fuel = fuel
        this.drive = function (fuelLoss) {
            this.fuel = this.fuel - fuelLoss
            return this.fuel
        }

    }
}


class Storage {
    constructor(capacity) {
        this.capacity = capacity
        this.storage = []
        this.totalCost = 0
    }

    addProduct(product) {
        this.storage.push(product)
        this.capacity -= product.quantity
        this.totalCost += product.quantity * product.price
    }

    getProducts() {
        let output = []
        for (let i = 0; i < this.storage.length; i++) {
            output.push((JSON.stringify(this.storage[i])))
        }
        return output.join("\n")
    }
}


function catalogue(input) {
    let tempArr = []
    let array = []
    let initials = []
    let initialsIndex = 0

    for (let i = 0; i < input.length; i++) {
        tempArr = input[i].split(' : ')
        array[i] = {
            name: tempArr[0],
            price: Number(tempArr[1]),
            initial: tempArr[0][0]
        }
    }

    array.sort((a, b) => a.name.localeCompare(b.name))

    for (let i = 0; i < array.length; i++) {
        if (!initials.includes(array[i].initial)) {
            initials.push(array[i].initial)
        }
    }


    for (let i = 0; i < initials.length; i++) {
        let letter = initials[i]
        console.log(letter);
        while (initialsIndex < array.length && letter == array[initialsIndex].initial) {
            console.log(`  ${array[initialsIndex].name}: ${array[initialsIndex].price}`);
            initialsIndex++
        }
    }
}


function sysReg(input) {
    let sysArr = []
    let sysIndex = 0
    let compIndex = 0
    let tempArr = []
    let tempObj = {}

    for (let i = 0; i < input.length; i++) {
        tempArr = input[i].split(' | ')

        if ((sysArr.filter(x => x.name == tempArr[0])).length == 0) {
            tempObj = {
                name: tempArr[0],
                components: []
            }
            sysArr.push(tempObj)
        }

        sysIndex = sysArr.findIndex(x => x.name == tempArr[0])

        if ((sysArr[sysIndex].components.filter(x => x.name == tempArr[1])).length == 0) {
            tempObj = {
                name: tempArr[1],
                sub: []
            }

            sysArr[sysIndex].components.push(tempObj)
        }

        compIndex = sysArr[sysIndex].components.findIndex(x => x.name == tempArr[1])

        sysArr[sysIndex].components[compIndex].sub.push(tempArr[2])
    }

    sysArr.sort((a, b) => {
        if (b.components.length == a.components.length) {
            return a.name.localeCompare(b.name)
        }
       return b.components.length - a.components.length
    })

    for (let i = 0; i < sysArr.length; i++) {
        sysArr[i].components.sort((a, b) => {
          return  b.sub.length - a.sub.length
        })
    }

    for (let i = 0; i < sysArr.length; i++) {
        console.log(sysArr[i].name);

        for (let j = 0; j < sysArr[i].components.length; j++) {
            console.log(`|||${sysArr[i].components[j].name}`);

            for (let k = 0; k < sysArr[i].components[j].sub.length; k++) {
                console.log(`||||||${sysArr[i].components[j].sub[k]}`);
            }
        }
    }

}
