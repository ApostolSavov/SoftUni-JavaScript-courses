function phonebook(input) {
    let person = []
    let phoneBook = {}
    for (const i of input) {
        person = i.split(' ')
        phoneBook[person[0]] = person[1]
    }
    for (const key in phoneBook) {
        if (phoneBook.hasOwnProperty(key)) {
            console.log(`${key} -> ${phoneBook[key]}`);
        }
    }
}


function storage(input) {
    let storage = new Map()

    for (const i of input) {
        let [item, quantity] = i.split(' ')

        if (!storage.has(item)) {
            storage.set(item, +quantity)
        } else {
            quantity = storage.get(item) + +quantity
            storage.set(item, quantity)
        }
    }

    for (const [item, quantity] of storage) {
        console.log(`${item} -> ${quantity}`);
    }
}



function grades(input) {
    let map = new Map()

    for (const index of input) {
        let [name, ...grades] = index.split(' ')
        if (!(map.has(name))) {
            map.set(name, grades.map(Number))
        }
        else {
            map.set(name, map.get(name).concat(grades.map(Number)))
        }

    }

    let sorted = Array.from(map).sort((a, b) => {
        let aSum = 0
        for (const num of a[1]) {
            aSum += num
        }

        let bSum = 0
        for (const num of b[1]) {
            bSum += num
        }

        return (aSum / a[1].length) - (bSum / b[1].length)
    })

    for (const student of sorted) {
        console.log(`${student[0]}: ${student[1].join(', ')}`);
    }
}

function occur(input) {
    let map = new Map()

    for (const word of input) {
        if (!map.has(word)) {
            map.set(word, 1)
        } else {
            map.set(word, (map.get(word) + 1))
        }
    }

    let sorted = Object.fromEntries((Array.from(map)).sort((a, b) => b[1] - a[1]))

    for (const key in sorted) {
        console.log(`${key} -> ${sorted[key]} times`);
    }
}


function neighbourhood(input) {
    let temp = input.shift().split(', ')
    let neighbourhoods = {}

    for (const i of temp) {
        neighbourhoods[i] = []
    }

    for (const person of input) {
        let [place, name] = person.split(' - ');
        if (neighbourhoods[place]) {
            neighbourhoods[place].push(name)
        }
    }

    let sorted = Object.entries(neighbourhoods).sort((a, b) => b[1].length - a[1].length)

    for (const [address, names] of sorted) {
        console.log(`${address}: ${names.length}`);
        for (const person of names) {
            console.log(`--${person}`);
        }
    }
}