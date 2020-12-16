function solve(area, vol, input) {
    return JSON.parse(input).map(x => {
        return { 'area': Math.abs(area.call(x)), 'volume': Math.abs(vol.call(x)) }
    })
}



class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName
        this.lastName = lastName
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }

    set fullName(value) {
        console.log(value.split(' '));
        if (value.split(' ').length > 1) {
            [this.firstName, this.lastName] = value.split(' ')
        }
    }
}


function custom(arr, func) {
    return arr.reduce((a, b) => {
        a.push(func(b))
        return a
    }, [])
}



function spy(target, method) {
    let originalRef = target[method]

    let result = { count: 0 }

    target[method] = function () {
        result.count++
        return originalRef.call(target, ...arguments)
    }

    return result
}

