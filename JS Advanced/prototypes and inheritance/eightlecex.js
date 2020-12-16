(function asd() {
    Array.prototype.last = function () { return this[this.length - 1] }
    Array.prototype.skip = function (n) {
        if (this[n] !== undefined) return this.slice(n)
    }
    Array.prototype.take = function (n) {
        if (this[n] !== undefined) return this.slice(0, n)
    }
    Array.prototype.sum = function () { return this.reduce((a, b) => a + b, 0) }
    Array.prototype.average = function () { return this.reduce((a, b) => a + b, 0) / this.length }
})()


function baloon() {
    class Balloon {
        constructor(color, gasWeight) {
            this.color = color
            this.gasWeight = gasWeight
        }
    }

    class PartyBalloon extends Balloon {
        constructor(color, gasWeight, ribbonColor, ribbonLength) {
            super(color, gasWeight)
            this.ribbonColor = ribbonColor
            this.ribbonLength = ribbonLength
        }

        get ribbon() {
            return { color: this.ribbonColor, length: this.ribbonLength }
        }
    }

    class BirthdayBalloon extends PartyBalloon {
        constructor(color, gasWeight, ribbonColor, ribbonLength, text) {
            super(color, gasWeight, ribbonColor, ribbonLength)
            this._text = text
        }

        get text() { return this._text }
    }

    return {
        Balloon,
        PartyBalloon,
        BirthdayBalloon
    }
}



function employee() {
    class Employee {
        constructor(name, age) {
            this.name = name
            this.age = age
            this.salary = 0
            this.tasks = []
        }

        work() {
            console.log(`${this.name} ${this.tasks[0]}`)
            this.tasks.push(this.tasks.shift())
        }

        collectSalary() {
            console.log(`${this.name} received ${this.salary + (this.dividend || 0)} this month.`)
        }

    }

    class Junior extends Employee {
        constructor(name, age) {
            super(name, age)
            this.tasks.push('is working on a simple task.')
        }
    }

    class Senior extends Employee {
        constructor(name, age) {
            super(name, age)
            this.tasks.push('is working on a complicated task.')
            this.tasks.push('is taking time off work.')
            this.tasks.push('is supervising junior workers.')
        }
    }

    class Manager extends Employee {
        constructor(name, age) {
            super(name, age)
            this.dividend = 0
            this.tasks.push('scheduled a meeting.')
            this.tasks.push('is preparing a quarterly report.')
        }
    }

    return { Employee, Junior, Senior, Manager }
}


function post() {
    class Post {
        constructor(title, content) {
            this.title = title
            this.content = content
        }

        toString() {
            return `Post: ${this.title}\nContent: ${this.content}`
        }
    }

    class SocialMediaPost extends Post {
        constructor(title, content, likes, dislikes) {
            super(title, content)
            this.likes = likes
            this.dislikes = dislikes
            this.comments = []
        }

        addComment(comment) {
            this.comments.push(comment)
        }

        toString() {
            return `${super.toString()}\nRating: ${this.likes - this.dislikes}${String(this.comments) ? '\nComments:\n * ' + this.comments.join('\n * ') : ''}`
        }
    }

    class BlogPost extends Post {
        constructor(title, content, views) {
            super(title, content)
            this.likes = 0
            this.dislikes = 0
            this.views = views
            this.comments = []
        }

        view() {
            this.views++
            return this
        }

        toString() {
            return `${super.toString()}\nViews: ${this.views}`
        }
    }

    return { Post, SocialMediaPost, BlogPost }
}


function createComputerHierarchy() {
    class Keyboard {
        constructor(manufacturer, responseTime) {
            this.manufacturer = manufacturer
            this.responseTime = responseTime
        }
    }

    class Monitor {
        constructor(manufacturer, width, height) {
            this.manufacturer = manufacturer
            this.width = width
            this.height = height
        }
    }

    class Battery {
        constructor(manufacturer, expectedLife) {
            this.manufacturer = manufacturer
            this.expectedLife = expectedLife
        }
    }

    class Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            if (new.target === Computer) {
                throw new Error("Can't instantiate abstract class")
            }
            this.manufacturer = manufacturer
            this.processorSpeed = processorSpeed
            this.ram = ram
            this.hardDiskSpace = hardDiskSpace
        }
    }

    class Laptop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace)
            this.weight = weight
            this.color = color
            this.battery = battery
        }

        get battery() {
            return this._battery
        }

        set battery(newBat) {
            if (!(newBat instanceof Battery)) {
                throw new TypeError('Not an instance of Battery')
            }
            this._battery = newBat
        }
    }

    class Desktop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace)
            this.keyboard = keyboard
            this.monitor = monitor
        }

        get keyboard() {
            return this._keyboard
        }

        set keyboard(newKey) {
            if (!(newKey instanceof Keyboard)) {
                throw new TypeError('Not an instance of Keyboard')
            }
            this._keyboard = newKey
        }

        get monitor() {
            return this._monitor
        }

        set monitor(newMon) {
            if (!(newMon instanceof Monitor)) {
                throw new TypeError('Not an instance of Monitor')
            }
            this._monitor = newMon
        }
    }

    return {
        Battery,
        Keyboard,
        Monitor,
        Computer,
        Laptop,
        Desktop
    }
}


let asd = createComputerHierarchy()
let battery = new asd.Battery('Energy', 3);
let qwe = new asd.Laptop("Hewlett Packard", 2.4, 4, 0.5, 3.12, "Silver", battery);
let zxc = asd.Laptop.prototype


function createMixins() {
    function computerQualityMixin(classPar) {
        classPar.prototype.getQuality = function () {
            return (this.processorSpeed + this.ram + this.hardDiskSpace) / 3
        }
        classPar.prototype.isFast = function () {
            return this.processorSpeed > (this.ram / 4)
        }
        classPar.prototype.isRoomy = function () {
            return this.hardDiskSpace > Math.floor(this.ram * this.processorSpeed)
        }
    }
    function styleMixin(classPar) {
        classPar.prototype.isFullSet = function () {
            return [this.manufacturer, this.keyboard.manufacturer, this.monitor.manufacturer].every(x => x === this.manufacturer)
        }
        classPar.prototype.isClassy = function () {
            return this.battery.expectedLife >= 3 && ['Silver', 'Black'].includes(this.color) && this.weight < 3

        }
    }

    return {
        computerQualityMixin,
        styleMixin
    }
}

