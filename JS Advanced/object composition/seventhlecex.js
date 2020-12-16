function hero() {
    return {
        fighter(name) {
            return {
                name,
                health: 100,
                stamina: 100,
                fight() {
                    this.stamina--
                    console.log(`${this.name} slashes at the foe!`)
                }
            }
        },
        mage(name) {
            return {
                name,
                health: 100,
                mana: 100,
                cast(spell) {
                    this.mana--
                    console.log(`${this.name} cast ${spell}`)
                }
            }
        }
    }
}


function worker(obj) {
    if (obj.dizziness) {
        obj.levelOfHydrated += 0.1 * obj.weight * obj.experience
        obj.dizziness = false
        return obj
    }
    return obj
}


function factory(order) {
    function engine() {
        return order.power <= 90 ? { power: 90, volume: 1800 } :
            order.power <= 120 ? { power: 120, volume: 2400 } :
                { power: 200, volume: 3500 }
    }

    return {
        model: order.model,
        engine: engine(),
        carriage: { type: order.carriage, color: order.color },
        wheels: new Array(4).fill(order.wheelsize % 2 != 0 ? order.wheelsize : --order.wheelsize)
    }
}


function templ() {
    return {
        extend(obj) {
            for (const key in obj) {
                if (typeof obj[key] === "function") {
                    Object.getPrototypeOf(this)[key] = obj[key]
                } else (
                    this[key] = obj[key]
                )
            }
        }
    }
}


(function modif() {
    String.prototype.ensureStart = function (str) {
        if (String(this).substring(0, str.length) != str) return `${str}` + this
        return String(this)
    }
    String.prototype.ensureEnd = function (str) {
        if (String(this).slice(-str.length) != str) return this + `${str}`
        return String(this)
    }
    String.prototype.isEmpty = function () {
        return !Boolean(String(this))
    }
    String.prototype.truncate = function (n) {
        if (this.length > n) {
            if (this.includes(' ')) {
                let temp = this.split(' ')
                while (temp.join(' ').length + 3 > n) {
                    temp.pop()
                }
                return temp.join(' ') + '...'
            } else if (n > 3) {
                return (this.substring(0, n - 3) + '...')
            }
            return '.'.repeat(n)
        }
        return String(this)
    }
    String.format = function (string, ...params) {
        for (const [match] of string.matchAll(/{\d+}/g)) {
            if (params.length === 0) break
            string = string.replace(match, params.shift())
        }
        return string
    }
})()


function sorted() {
    function Obj() {
        this.list = [],
            this.sortList = () => this.list.sort((a, b) => a - b),
            this.add = el => {
                this.list.push(el)
                this.sortList()
            },
            this.remove = i => {
                if (this.list[i] != undefined) this.list.splice(i, 1)
                this.sortList()
            },
            this.get = i => {
                if (this.list[i] != undefined) return this.list[i]
                this.sortList()
            },
            Object.defineProperties(this, {
                size: {
                    get: () => this.list.length
                }
            })
    }
    return new Obj()
}


function createTracker() {
    let tracker = {
        list: [],
        id: 0,
        outputElement: {},
        report(author, description, reproducible, severity) {
            this.list.push({
                ID: this.id,
                author,
                description,
                reproducible,
                severity,
                status: 'Open'
            })
            this.id++
            this.change()
        },
        setStatus(id, newStatus) {
            let rep = this.list.find(x => x.ID === id)
            rep ? rep.status = newStatus : null
            this.change()
        },
        remove(id) {
            let ind = this.list.findIndex(x => x.ID == id)
            ind >= 0 ? this.list.splice(ind, 1) : null
            this.change()
        },
        sort(method) {
            this.list.sort((a, b) => {
                if (method == 'author') return a[method].localeCompare(b[method])
                return a[method] - b[method]
            })
            this.change()
        },
        output(selector) {
            this.outputElement = document.querySelector(selector)
            this.change()
        },
        change() {
            this.outputElement.innerHTML = this.list.map(x => {
                return `<div id="report_${x.ID}" class="report">
                <div class="body">
                  <p>${x.description}</p>
                </div>
                <div class="title">
                  <span class="author">Submitted by: ${x.author}</span>
                  <span class="status">${x.status} | ${x.severity}</span>
                </div>
              </div>
              `
            }).join('\n')
        }
    }

    return tracker
}