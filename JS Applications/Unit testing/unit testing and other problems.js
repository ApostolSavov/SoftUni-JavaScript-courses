function validator(obj) {

    if (!obj.hasOwnProperty('method') || !['GET', 'POST', 'DELETE', 'CONNECT'].includes(obj.method)) {
        throw new Error('Invalid request header: Invalid Method')
    } else if (!obj.hasOwnProperty('uri') || !(/^([a-z0-9\.]+|\*)$/.test(obj.uri))) {
        throw new Error('Invalid request header: Invalid URI')
    } else if (!obj.hasOwnProperty('version') || !/HTTP\/(0\.9|1\.0|1\.1|2\.0)/.test(obj.version)) {
        throw new Error('Invalid request header: Invalid Version')
    } else if (!obj.hasOwnProperty('message') || !(/^([^<>\\&'"]+)$/.test(obj.message))) {
        throw new Error('Invalid request header: Invalid Message')
    }

    return obj
}


let isOddOrEven = function (string) {
    if (typeof (string) !== 'string') {
        return undefined;
    }
    if (string.length % 2 === 0) {
        return "even";
    }

    return "odd";
};


describe('Even or odd', function () {
    it('Should be a string', () => {
        let a = 5

        let result = isOddOrEven(a)

        assert.equal(result, undefined)
    })
    it('Should be even', () => {

        let a = 'even'

        let result = isOddOrEven(a)

        assert.equal(result, 'even')
    })
    it('Should be a odd', () => {

        let a = 'asd'

        let result = isOddOrEven(a)

        assert.equal(result, 'odd')
    })
})


let lookupChar = function (string, index) {
    if (typeof (string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }

    return string.charAt(index);
};


describe('char at', function () {
    it('Should be valid params', () => {
        let a = 'test'

        let b = '3'

        let result = lookupChar(a, b)

        assert.equal(result, undefined)
    })
    it('Should be valid params', () => {
        let a = 'test'

        let b = 'asd'

        let result = lookupChar(a, b)

        assert.equal(result, undefined)
    })
    it('Should be valid params', () => {
        let a = 2

        let b = 5

        let result = lookupChar(a, b)

        assert.equal(result, undefined)
    })
    it('Should be valid params', () => {
        let a = 'asd'
        let b = 2.5

        let result = lookupChar(a, b)

        assert.equal(result, undefined)
    })
    it('Should be valid index', () => {

        let a = 'pesho'

        let b = 11

        let result = lookupChar(a, b)

        assert.equal(result, 'Incorrect index')
    })
    it('Should be valid index', () => {

        let a = 'stamat'

        let b = -1

        let result = lookupChar(a, b)

        assert.equal(result, 'Incorrect index')
    })
    it('Should return char', () => {

        let a = 'serafim'

        let b = 0

        let result = lookupChar(a, b)

        assert.equal(result, 's')
    })
    it('Should return char', () => {

        let a = 'serafiM'

        let b = 6

        let result = lookupChar(a, b)

        assert.equal(result, 'M')
    })
})


let mathEnforcer = {
    addFive: function (num) {
        if (typeof (num) !== 'number') {
            return undefined;
        }
        return num + 5;
    },
    subtractTen: function (num) {
        if (typeof (num) !== 'number') {
            return undefined;
        }
        return num - 10;
    },
    sum: function (num1, num2) {
        if (typeof (num1) !== 'number' || typeof (num2) !== 'number') {
            return undefined;
        }
        return num1 + num2;
    }
};

describe('Math methods', function () {
    it('Not a number', () => {

        let result = mathEnforcer;

        assert.equal(result.addFive('pesho'), undefined)
    })
    it('Not a number', () => {

        let result = mathEnforcer;

        assert.equal(result.subtractTen('stamat'), undefined)
    })
    it('Not a number', () => {

        let result = mathEnforcer;

        assert.equal(result.sum('strahil', 5), undefined)
    })
    it('Not a number', () => {

        let result = mathEnforcer;

        assert.equal(result.sum(2, 'serafim'), undefined)
    })
    it('Should return num', () => {

        let result = mathEnforcer;

        assert.equal(result.addFive(5), 10)
    })
    it('Should return num', () => {

        let result = mathEnforcer;

        assert.equal(result.subtractTen(15), 5)
    })
    it('Should return num', () => {

        let result = mathEnforcer;

        assert.equal(result.sum(15, 5), 20)
    })
    it('Should return num', () => {

        let result = mathEnforcer;

        assert.equal(result.sum(5.5, 5.5), 11)
    })
    it('Should return num', () => {

        let result = mathEnforcer;

        assert.equal(result.addFive(5.5), 10.5)
    })
    it('Should return num', () => {

        let result = mathEnforcer;

        assert.equal(result.subtractTen(15.5), 5.5)
    })
    it('Should return num', () => {

        let result = mathEnforcer;

        assert.equal(result.subtractTen(-15), -25)
    })
    it('Should return num', () => {

        let result = mathEnforcer;

        assert.equal(result.addFive(-15), -10)
    })
    it('Should return num', () => {

        let result = mathEnforcer;

        assert.equal(result.sum(-5, -10), -15)
    })
})


class StringBuilder {
    constructor(string) {
        if (string !== undefined) {
            StringBuilder._vrfyParam(string);
            this._stringArray = Array.from(string);
        } else {
            this._stringArray = [];
        }
    }

    append(string) {
        StringBuilder._vrfyParam(string);
        for (let i = 0; i < string.length; i++) {
            this._stringArray.push(string[i]);
        }
    }

    prepend(string) {
        StringBuilder._vrfyParam(string);
        for (let i = string.length - 1; i >= 0; i--) {
            this._stringArray.unshift(string[i]);
        }
    }

    insertAt(string, startIndex) {
        StringBuilder._vrfyParam(string);
        this._stringArray.splice(startIndex, 0, ...string);
    }

    remove(startIndex, length) {
        this._stringArray.splice(startIndex, length);
    }

    static _vrfyParam(param) {
        if (typeof param !== 'string') throw new TypeError('Argument must be а string');
    }

    toString() {
        return this._stringArray.join('');
    }
}


describe('String builder', function () {
    it('Not a number', () => {

        assert.throws(() => new StringBuilder(12), TypeError)
    })
    it('Should be empty string', () => {

        let result = new StringBuilder()

        assert.equal(result.toString(), '')
    })
    it('Should be a string', () => {

        let result = new StringBuilder('asd')

        assert.equal(result.toString(), 'asd')
    })
    it('Should append', () => {

        let result = new StringBuilder('asd')

        result.append('fgh')

        assert.equal(result.toString(), 'asdfgh')
    })
    it('Should prepend', () => {

        let result = new StringBuilder('asd')

        result.prepend('fgh')

        assert.equal(result.toString(), 'fghasd')
    })
    it('Should insert', () => {

        let result = new StringBuilder('asd')

        result.insertAt('fgh', 1)

        assert.equal(result.toString(), 'afghsd')
    })
    it('Test all', () => {
        let str = new StringBuilder('hello');
        str.append(', there');
        str.prepend('User, ');
        str.insertAt('woop', 5);
        str.remove(6, 3);
        assert.equal(str.toString(), "User,w hello, there")
    })
    it('Should remove', () => {

        let result = new StringBuilder('asdf')

        result.remove(1, 2)

        assert.equal(result.toString(), 'af')
    })
    it('Should be an instance', () => {

        let result = new StringBuilder()

        assert.equal(result instanceof StringBuilder, true)
    })
    it('Has props', () => {

        let result = new StringBuilder()
        let proto = Object.getPrototypeOf(result)

        assert.equal(proto.hasOwnProperty('append'), true)
        assert.equal(proto.hasOwnProperty('prepend'), true)
        assert.equal(proto.hasOwnProperty('insertAt'), true)
        assert.equal(proto.hasOwnProperty('remove'), true)
        assert.equal(proto.hasOwnProperty('toString'), true)
    })
    it('Should be an instance', () => {

        assert.equal(StringBuilder.hasOwnProperty("_vrfyParam"), true)
    })

})


class PaymentPackage {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        this.VAT = 20;      // Default value
        this.active = true; // Default value
    }

    get name() {
        return this._name;
    }

    set name(newValue) {
        if (typeof newValue !== 'string') {
            throw new Error('Name must be a non-empty string');
        }
        if (newValue.length === 0) {
            throw new Error('Name must be a non-empty string');
        }
        this._name = newValue;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('Value must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('Value must be a non-negative number');
        }
        this._value = newValue;
    }

    get VAT() {
        return this._VAT;
    }

    set VAT(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('VAT must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('VAT must be a non-negative number');
        }
        this._VAT = newValue;
    }

    get active() {
        return this._active;
    }

    set active(newValue) {
        if (typeof newValue !== 'boolean') {
            throw new Error('Active status must be a boolean');
        }
        this._active = newValue;
    }

    toString() {
        const output = [
            `Package: ${this.name}` + (this.active === false ? ' (inactive)' : ''),
            `- Value (excl. VAT): ${this.value}`,
            `- Value (VAT ${this.VAT}%): ${this.value * (1 + this.VAT / 100)}`
        ];
        return output.join('\n');
    }
};

describe('Payment package', function () {
    it('Valid', () => {
        let result = new PaymentPackage('test', 10)

        assert.equal(result instanceof PaymentPackage, true)
    })
    it('Valid', () => {
        let result = new PaymentPackage('test', 10)

        assert.throws(() => result.name = '', 'Name must be a non-empty string')
    })
    it('Valid', () => {
        let result = new PaymentPackage('test', 10)

        assert.throws(() => result.name = 5, 'Name must be a non-empty string')
    })
    it('Valid', () => {
        let result = new PaymentPackage('test', 10)

        assert.throws(() => result.value = 'five', 'Value must be a non-negative number')
    })
    it('Valid', () => {
        let result = new PaymentPackage('test', 10)

        assert.throws(() => result.value = -10, 'Value must be a non-negative number')
    })
    it('Valid', () => {
        let result = new PaymentPackage('test', 10)

        assert.throws(() => result.VAT = 'ten', 'VAT must be a non-negative number')
    })
    it('Valid', () => {
        let result = new PaymentPackage('test', 10)

        assert.throws(() => result.VAT = -10, 'VAT must be a non-negative number')
    })
    it('Valid', () => {
        let result = new PaymentPackage('test', 10)

        assert.throws(() => result.active = 10, 'Active status must be a boolean')
    })
    it('Valid', () => {
        let result = new PaymentPackage('test', 10)

        assert.throws(() => result.active = 'start', 'Active status must be a boolean')
    })
    it('Valid', () => {
        let result = new PaymentPackage('test', 10)

        assert.throws(() => result.active = null, 'Active status must be a boolean')
    })
    it('Valid', () => {
        let result = new PaymentPackage('test', 10)

        assert.equal(result.toString(), 'Package: test\n- Value (excl. VAT): 10\n- Value (VAT 20%): 12')
    })
    it('Valid', () => {
        let result = new PaymentPackage('test', 10)

        result.active = false

        assert.equal(result.toString(), 'Package: test (inactive)\n- Value (excl. VAT): 10\n- Value (VAT 20%): 12')
    })
    it('Valid', () => {
        let result = new PaymentPackage('test', 10)
        let proto = Object.getPrototypeOf(result)

        assert.equal(result.hasOwnProperty('_name'), true)
        assert.equal(result.hasOwnProperty('_value'), true)
        assert.equal(result.hasOwnProperty('_VAT'), true)
        assert.equal(result.hasOwnProperty('_active'), true)
        assert.equal(proto.hasOwnProperty('toString'), true)
        assert.equal(proto.hasOwnProperty('name'), true)
        assert.equal(proto.hasOwnProperty('value'), true)
        assert.equal(proto.hasOwnProperty('VAT'), true)
        assert.equal(proto.hasOwnProperty('active'), true)
    })
    it('Valid', () => {
        let result = new PaymentPackage('test', 10)
        result.name = 'pesho'
        result.value = 20
        result.VAT = 10
        result.active = false

        assert.equal(result.toString(), 'Package: pesho (inactive)\n- Value (excl. VAT): 20\n- Value (VAT 10%): 22')
    })
    it('Valid', () => {

        assert.throws(() => new PaymentPackage(), 'Name must be a non-empty string')
    })
    it('Valid', () => {

        assert.throws(() => new PaymentPackage('stamat'), 'Value must be a non-negative number')
    })
    it('Valid', () => {

        assert.throws(() => new PaymentPackage(5, 5), 'Name must be a non-empty string')
    })
    it('Valid', () => {

        assert.throws(() => new PaymentPackage('5', '5'), 'Value must be a non-negative number')
    })
    it('Valid', () => {
        let result = new PaymentPackage('test', 10)
        result.name = 'pesho'
        result.value = 20
        result.VAT = 10
        result.active = false

        assert.equal(result.name, 'pesho')
        assert.equal(result.value, 20)
        assert.equal(result.VAT, 10)
        assert.equal(result.active, false)
    })

})