function solution(num) {
    return function inner(num2) {
        return +num + +num2
    }
}


function currencyFormatter(separator, symbol, symbolFirst, value) {
    let result = Math.trunc(value) + separator;
    result += value.toFixed(2).substr(-2, 2);
    if (symbolFirst) return symbol + ' ' + result;
    else return result + ' ' + symbol;
}


function curr(func) {
    return function inner(val) {
        return func(',', '$', true, val)
    }
}


function employees(data, criterion) {
    let [prop, val] = criterion.split('-')
    JSON.parse(data).filter(x => x[prop] === val)
        .forEach((x, i) => console.log(`${i}. ${x.first_name} ${x.last_name} - ${x.email}`))
}


function solution() {
    return {
        string: '',
        append(str) {
            this.string += str
        },
        removeStart(n) {
            this.string = this.string.slice(n)
        },
        removeEnd(n) {
            this.string = this.string.slice(0, this.string.length - n)
        },
        print() {
            console.log(this.string)
        }
    }
}


function sorting(arr, dir) {
    let obj = {
        'asc': (a, b) => a - b,
        'desc': (a, b) => b - a
    }
    return arr.sort(obj[dir])
}


function args() {
    let map = new Map()
    Array.from(arguments).forEach(x => {
        if (map.has(typeof x)) map.get(typeof x).push(x)
        else map.set(typeof x, [x])
        console.log(`${typeof x}: ${x}`);
    })
    Array.from(map).sort((a, b) => b[1].length - a[1].length).forEach(x => console.log(`${x[0]} = ${x[1].length}`))
}


function bmi(name, age, weight, height) {

    function Obj(name, age, weight, height) {
        this.name = name,
            this.personalInfo = {
                age,
                weight,
                height
            },
            this.BMI = Math.round(this.personalInfo.weight / ((this.personalInfo.height / 100) ** 2)),
            this.status = (() => {
                let bmi = this.BMI
                if (bmi < 18.5) return 'underweight'
                else if (bmi < 25) return 'normal'
                else if (bmi < 30) return 'overweight'
                return 'obese'
            })()
        this.recommendation = (() => this.status === 'obese' ? 'admission required' : undefined)()
    }

    return new Obj(name, age, weight, height)
}

function asd() {
    return {
        add: (a, b) => [a[0] + b[0], a[1] + b[1]],
        multiply: (a, s) => [a[0] * s, a[1] * s],
        length: (a) => Math.sqrt(a[0] ** 2 + a[1] ** 2),
        dot: (a, b) => a[0] * b[0] + a[1] * b[1],
        cross: (a, b) => a[0] * b[1] - a[1] * b[0]
    }
}


function recipe() {
    let obj = {
        meals: {
            apple: { carbohydrate: 1, flavour: 2 },
            lemonade: { carbohydrate: 10, flavour: 20 },
            burger: { carbohydrate: 5, fat: 7, flavour: 3 },
            eggs: { protein: 5, fat: 1, flavour: 1 },
            turkey: { protein: 10, carbohydrate: 10, fat: 10, flavour: 10 }
        },
        stock: {
            protein: 0,
            carbohydrate: 0,
            fat: 0,
            flavour: 0
        },
        restock(el, quant) {
            this.stock[el] += +quant
            return 'Success'
        },
        prepare(meal, quant) {
            let curr = this.meals[meal]
            for (const el in curr) {
                if (!(this.stock[el] >= curr[el] * quant)) {
                    return `Error: not enough ${el} in stock`
                }
            }
            for (const el in curr) {
                this.stock[el] -= curr[el] * quant
            }
            return 'Success'
        },
        report() {
            let curr = this.stock
            return `protein=${curr.protein} carbohydrate=${curr.carbohydrate} fat=${curr.fat} flavour=${curr.flavour}`
        }
    }

    return function manager(string) {
        let [cmd, el, quant] = string.split(' ')
        return (obj[cmd](el, quant))
    }
}


(function () {
    let sum = 0

    return function add(num) {
        sum += Number(num)
        add.toString = () => sum
        return add
    }
})()


    (function monkey() {
        let obj = {
            upvote: function () { this.upvotes++ },
            downvote: function () { this.downvotes++ },
            rating: function () {
                let up = this.upvotes
                let down = this.downvotes
                let total = +up + +down
                if (up / total > 0.66 && total >= 10) return 'hot'
                else if (!(up / total > 0.66) && up >= down && (up > 100 || down > 100)) return 'controversial'
                else if (up < down && total >= 10) return 'unpopular'
                return 'new'
            }
        }
        obj.score = function () {
            let up = +this.upvotes
            let down = +this.downvotes
            let bonus = up + down > 50 ? Math.ceil(0.25 * Math.max(up, down)) : 0
            return [up + bonus, down + bonus, up - down, obj.rating.call(this)]
        }

        function inner(cmd) {
            return obj[cmd].call(this)
        }

        return inner
    })()

