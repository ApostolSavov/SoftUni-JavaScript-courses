class Company {
    constructor() {
        this.departments = []
    }

    addEmployee(name, salary, position, department) {
        if (!name || !position || !department || [null, undefined, ""].includes(salary) || salary < 0) throw new Error("Invalid input!");

        let obj = this.departments.find(x => x.department === department)

        if (obj) obj.employees.push({ name, salary, position })
        else this.departments.push({ department, employees: [{ name, salary, position }] })

        return `New employee is hired. Name: ${name}. Position: ${position}`
    }

    bestDepartment() {
        let avg = (el) => (el.employees.reduce((a, b) => a + +b.salary, 0) / el.employees.length)
        let best = this.departments.sort((a, b) => avg(b) - avg(a))[0]
        let sortedEmp = best.employees.sort((a, b) => b.salary - a.salary || a.name.localeCompare(b.name)).map(x => [`${x.name} ${x.salary} ${x.position}`]).join('\n')

        return `Best Department is: ${best.department}\nAverage salary: ${(best.employees.reduce((a, b) => a + +b.salary, 0) / best.employees.length).toFixed(2)}\n${sortedEmp}`
    }
}



function getFibonator() {
    let prev = 0
    let curr = 1

    function inner() {
        let fib = prev + curr
        prev = curr
        curr = fib

        return prev
    }

    return inner
}


class Hex {
    constructor(value) {
        this.value = value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return `0x${(this.value).toString(16).toUpperCase()}`
    }

    plus(number) {
        return new Hex(+this.value + +number)
    }

    minus(number) {
        return new Hex(this.value - number)
    }

    parse(string) {
        return string.toString(2)
    }
}


function getArticleGenerator(articles) {
    let div = document.getElementById('content')

    return function inner() {
        if (articles.length > 0){
            div.innerHTML += `<article>${articles.shift()}</article>`
        }   
    }
}