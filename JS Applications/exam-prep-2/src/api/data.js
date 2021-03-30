import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllItems(page = 1) {
	return await api.get(host + `/data/cars?sortBy=_createdOn%20desc&offset=${(page - 1) * 3}&pageSize=3`);
}

export async function getItem(id) {
	return await api.get(host + '/data/cars/' + id);
}

export async function getMyItems(id) {
	return await api.get(host + `/data/cars?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
}

export async function createItem(data) {
	return await api.post(host + '/data/cars', data);
}

export async function editItem(id, data) {
	return await api.put(host + `/data/cars/${id}`, data);
}

export async function deleteItem(id) {
	return await api.del(host + `/data/cars/${id}`);
}

export async function search(query) {
	return await api.get(host + `/data/cars?where=year%3D${query}`);
}

export async function getCollectionSize() {
	return await api.get(host + '/data/cars?sortBy=_createdOn%20desc&count');
}

export function itemSubmitValidation() {
	const form = document.getElementsByTagName('form')[0];
	const inputs = Array.from(form.elements);
	const inputValues = inputs.filter((x) => x.name != '').map((x) => x.value.trim());

	if (inputValues.includes('')) {
		throw new Error('Empty fields!');
	}

	return inputs.filter((x) => x.name != '').reduce((acc, input) => ({ ...acc, [input.name]: input.value }), {});
}
