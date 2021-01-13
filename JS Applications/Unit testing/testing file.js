const assert = require('chai').assert
const data = require('./unitTestinglab.js')


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