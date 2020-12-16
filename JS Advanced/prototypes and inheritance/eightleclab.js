function personAndTeacher() {
    class Person {
        constructor(name, email) {
            this.name = name,
                this.email = email
        }
    }

    class Teacher extends Person {
        constructor(name, email, subject) {
            super(name, email)
            this.subject = subject
        }
    }

    return {
        Person,
        Teacher
    }
}


function inherit() {
    class Person {
        constructor(name, email) {
            this.name = name
            this.email = email
        }

        toString() {
            let str = []
            for (const key in this) {
                str.push(`${key}: ${this[key]}`)
            }
            return `${this.constructor.name} (${str.join(', ')})`
        }
    }

    class Teacher extends Person {
        constructor(name, email, subject) {
            super(name, email)
            this.subject = subject
        }
    }

    class Student extends Person {
        constructor(name, email, course) {
            super(name, email)
            this.course = course
        }
    }

    return {
        Person,
        Teacher,
        Student
    }
}


function extendPrototype(classExt) {
    classExt.prototype.species = 'Human'
    classExt.prototype.toSpeciesString = function () {
        return `I am a ${this.species}. ${this.toString()}`
    }
}


function figures() {

    class Figure {
        constructor(units = 'cm') {
            this.units = units
        }

        changeUnits(unit = 'cm') {
            let toCm = {
                m: 100,
                cm: 1,
                mm: 0.1
            }
            let fromCm = {
                m: 0.1,
                cm: 1,
                mm: 100
            }
            for (const key in this) {
                if (key != 'units') {
                    this[key] = this[key] * (toCm[this.units] * fromCm[unit])
                }
            }
            this.units = unit
            return toCm[this.units] * fromCm[unit]
        }

        toString() {
            let str = []
            for (const key in this) {
                if (key != 'units') str.push(`${key}: ${this[key]}`)
            }
            return `Figures units: ${this.units} Area: ${this.area} - ${str.join(', ')}`
        }
    }

    class Circle extends Figure {
        constructor(radius, units) {
            super(units)
            this.radius = radius * this.changeUnits(units)
        }

        get area() { return Math.PI * this.radius ** 2 }
    }

    class Rectangle extends Figure {
        constructor(width, height, units) {
            super(units)
            this.width = width * this.changeUnits(units)
            this.height = height * this.changeUnits(units)
        }

        get area() { return this.width * this.height }
    }

    return {
        Figure,
        Circle,
        Rectangle
    }
}


