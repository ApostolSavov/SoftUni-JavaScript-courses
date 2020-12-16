function heroes(input) {
    let list = []
    input.forEach(x => {
        let [name, lvl, items] = x.split(' / ')
        list.push({
            name: name,
            level: Number(lvl),
            items: items ? [...(items.split(', '))] : []
        })
    })
    console.log(JSON.stringify(list))
}


function table(input) {
    let list = []
    let html = '<table>\n'
    input.forEach(x => {
        let temp = JSON.parse(x)
        html += `\t<tr>\n\t\t<td>${repl(temp.name)}</td>\n\t\t<td>${repl(temp.position)}</td>\n\t\t<td>${Number(repl(temp.salary))}</td>\n\t</tr>\n`
    })
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


function cappy(input) {
    let juices = {}
    let bottles = []
    input.forEach(x => {
        let [name, amount] = x.split(' => ')
        juices[name] = juices[name] ? juices[name] + +amount : +amount
        if (juices[name] >= 1000 && !bottles.includes(name)) bottles.push(name)
    })
    for (const name of bottles) {
        console.log(`${name} => ${Math.trunc(juices[name] / 1000)}`)
    }
}


function store(input) {
    let list = []
    let letter = new Set()
    for (const item of input) {
        letter.add(item[0])
        list.push(item.split(' : '))
    }
    list = list.sort((a, b) => a[0].localeCompare(b[0]))
    letter = Array.from(letter).sort((a, b) => a.localeCompare(b))
    for (const char of letter) {
        console.log(char)
        list.filter(x => x[0][0] === char).forEach(x => console.log(`  ${x[0]}: ${x[1]}`))
    }
}


function cars(input) {
    let register = {}
    for (const item of input) {
        let [brand, model, amount] = item.split(' | ')
        if (register[brand]) register[brand][model] = +amount + (register[brand][model] || 0)
        else register[brand] = { [model]: +amount }
    }
    for (const brand in register) {
        console.log(brand)
        for (const model in register[brand]) {
            console.log(`###${model} -> ${register[brand][model]}`)
        }
    }
}


function system(input) {
    let reg = {}
    for (item of input) {
        let [sys, comp, sub] = item.split(' | ')
        if (reg[sys]) reg[sys][comp] ? reg[sys][comp].push(sub) : reg[sys][comp] = [sub]
        else reg[sys] = { [comp]: [sub] }
    }

    Object.entries(reg).sort((a, b) => {
        Object.keys(b[1]).length - Object.keys(a[1]).length || a[0].localeCompare(b[0])
    }).forEach(x => {
        console.log(x[0])
        Object.entries(x[1]).sort((a, b) => b[1].length - a[1].length).forEach(y => {
            console.log(`|||${y[0]}`)
            y[1].forEach(z => console.log(`||||||${z}`))
        })
    })
}


class Request {
    constructor(method, uri, version, message) {
        this.method = method
        this.uri = uri
        this.version = version
        this.message = message
        this.response = undefined
        this.fulfilled = false
    }
}


function ticket(arr, criterion) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination
            this.price = +price
            this.status = status
        }
    }

    return arr.map(x => (new Ticket(...(x).split('|'))))
        .sort((a, b) => criterion == 'price' ? a.price - b.price : a[criterion].localeCompare(b[criterion]))
}


class List {
    constructor() {
        this.collection = []
        this.size = this.collection.length
    }
    add(element) {
        this.collection.push(+element)
        this.collection.sort((a, b) => a - b)
        this.size++
    }
    remove(index) {
        if (isNaN(this.collection[index])) {
            this.collection.splice(index, 1)
            this.size--
        }
    }
    get(index) {
        return this.collection[index] || 0
    }
}


class Stringer {
    constructor(string, length) {
        this.innerString = string
        this.innerLength = length
    }
    decrease(len) {
        this.innerLength = Math.max(this.innerLength - len, 0)
    }
    increase(len) {
        this.innerLength += len
    }
    toString() {
        if (this.innerString.length > this.innerLength) return (this.innerString.slice(0, this.innerLength) + '...')
        return this.innerString
    }
}
