function rectangle(input) {
    return input.map(([width, height]) => {
        return {
            width, height,
            area() {
                return this.width * this.height
            },
            compareTo(other) {
                return other.area() - this.area() || other.width - this.width
            }
        }
    }).sort((a, b) => b.area() - a.area() || b.width - a.width)
}



let qwe = (function process() {
    let obj = {
        collection: [],
        add(string) { this.collection.push(string) },
        remove(string) { this.collection = this.collection.filter(x => x != string) },
        print() { console.log(this.collection.join(',')) }
    };

    return function inner(input) {
        input.forEach(x => {
            let [cmd, val] = x.split(' ')
            obj[cmd](val)
        })
    }
})()


function compose(input) {
    console.log(Object.assign({}, ...JSON.parse(input)))
}



let result = (function modify() {
    let obj = {}
    return function inner(input) {
        input.forEach(x => {
            let [func, par, func2, par2] = x.split(' ')
            if (func == 'create' && !func2) Object.assign(obj, { [par]: {} });
            else if (func == 'create') obj[par] = Object.create(obj[par2]);
            else if (func == 'set') obj[par] = Object.assign(obj[par], { [func2]: par2 })
            else if (func == 'print') {
                let a = Object.entries(obj[par]).map(x => `${x[0]}:${x[1]}`).join(',')
                let b = Object.getPrototypeOf(obj[par]) ?
                    (() => {
                        let output = []
                        let prot = Object.getPrototypeOf(obj[par])
                        for (const prop in prot) {
                            output.push(`${prop}:${prot[prop]}`)
                        }
                        return output.join(', ')
                    })() :
                    ''
                console.log([a, b].filter(Boolean).join(', '))
            }
        })
    }
})()


function object() {
    return {
        init(sel1, sel2, res) {
            this.selector1 = document.querySelector(`${sel1}`)
            this.selector2 = document.querySelector(`${sel2}`)
            this.result = document.querySelector(`${res}`)
        },
        add() {
            this.result.value =
                +this.selector1.value + +this.selector2.value
        },
        subtract() {
            this.result.value =
                this.selector1.value - this.selector2.value
        }
    }
}