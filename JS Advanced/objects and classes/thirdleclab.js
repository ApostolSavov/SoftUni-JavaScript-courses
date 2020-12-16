function town(input) {
    let data = input.map(x => x.split('|').map(y => y.trim()).filter(n => n))
    let output = []
    for (let i = 1; i < data.length; i++) {
        output.push(
            {
                Town: data[i][0],
                Latitude: +(Number(data[i][1]).toFixed(2)),
                Longitude: +(Number(data[i][2]).toFixed(2))
            }
        )
    }

    console.log(JSON.stringify(output));
}


function sum(input) {
    let object = {}
    for (let i = 0; i < input.length; i += 2) {
        object[input[i]] ? object[input[i]] += +input[i + 1] : object[input[i]] = +input[i + 1]
    }
    console.log(JSON.stringify(object));
}


function population(input) {
    let object = {}
    for (const item of input) {
        let [town, population] = item.split(' <-> ')
        object[town] ? object[town] += +population : object[town] = +population
    }
    Object.keys(object).forEach(x => console.log(`${x} : ${object[x]}`))
}


function html(input) {
    input = JSON.parse(input)
    let html = '<table>\n'
    html += `\t<tr>${Object.keys(input[0]).map(x => `<th>${repl(x)}</th>`).join('')}</tr>\n`
    for (const item of input) {
        let name = Object.values(item)
        html += `\t<tr>${Object.values(item).map(x => `<td>${repl(x)}</td>`).join('')}</tr>\n`
    }
    html += '</table>'
    console.log(html);

    function repl(str) {
        return String(str).replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, "&#39;")
    }
}



function lowest(input) {
    let list = new Map()
    for (const item of input) {
        let [town, prod, price] = item.split(' | ')
        if (!list.has(prod)) list.set(prod, new Map())
        list.get(prod).set(town, Number(price))
    }

    for (const [car, data] of list) {

        let lowestPrice = [...data].reduce((a, b) => {
            if (a[1] > b[1]) return b
            return a
        })
        console.log(`${car} -> ${lowestPrice[1]} (${lowestPrice[0]})`)
    }
}



class Person {
    constructor(firstName, lastName, age, email) {
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.email = email
    }
    toString() {
        return (`${this.firstName} ${this.lastName} (age: ${this.age}, email: ${this.email})`)
    }
}


class Circle {
    constructor(radius) {
        this.radius = radius
    }

    get diameter() {
        return this.radius * 2
    }

    set diameter(diameter) {
        this.radius = diameter / 2
    }

    get area() {
        return Math.PI * (this.radius ** 2)
    }
}


class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    static distance(p1, p2) {
        return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
    }
}