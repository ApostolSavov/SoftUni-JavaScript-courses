import * as api from './api.js'

const host = 'http://localhost:3030'
api.settings.host = host

export const login = api.login
export const register = api.register
export const logout = api.logout

export async function getFurniture() {
    return await api.get(host + '/data/catalog')
}

export async function getItem(id) {
    return await api.get(host + '/data/catalog/' + id)
}

export async function getMyItems() {
    return await api.get(host + `/data/catalog?where=_ownerId%3D%22${sessionStorage.getItem('userId')}%22`)
}

export async function createItem(data) {
    return await api.post(host + '/data/catalog', data)
}

export async function editItem(id, data) {
    return await api.put(host + `/data/catalog/${id}`, data)
}

export async function deleteItem(id) {
    return await api.del(host + `/data/catalog/${id}`)
}

export function itemSubmitValidation() {
    const form = document.getElementsByTagName('form')[0]
    const inputs = Array.from(form.elements)
    const inputValues = inputs
        .filter(x => x.name != 'material' && x.name != '')
        .map(x => x.value.trim())

    if (inputValues.includes('')) {
        alert('Empty fields!')
        return new Error('Empty fields!')
    } else if (inputs.some(input => input.classList.contains('is-invalid'))) {
        alert('One or more fields are invalid.')
        return new Error('One or more fields are invalid.')
    }

    return inputs
        .filter(x => x.name != '')
        .reduce((acc, input) => ({ ...acc, [input.name]: input.value }), {})
}

export function fieldChangeValidation(target) {
    const name = target.name
    const value = target.value

    if ((name == 'make' || name == 'model') && value.length < 4) {
        makeInvalid(target)
        alert(`${name.charAt(0).toUpperCase() + name.slice(1)} has to be at least 4 characters long.`)
    } else if (name == 'year' && (value > 2050 || value < 1950)) {
        makeInvalid(target)
        alert(`Year has to be between 1950 and 2050.`)
    } else if (name == 'description' && value.length <= 10) {
        makeInvalid(target)
        alert(`Description has to be more than 10 characters.`)
    } else if (name == 'price' && value <= 0) {
        makeInvalid(target)
        alert(`Price has to be a positive number.`)
    } else if (name == 'img' && value.trim() == '') {
        makeInvalid(target)
        alert(`Image URL or local path is required.`)
    } else {
        makeValid(target)
    }
}

function makeValid(target) {
    target.classList.remove('is-invalid')
    target.classList.add('is-valid')
}

function makeInvalid(target) {
    target.classList.remove('is-valid')
    target.classList.add('is-invalid')
}