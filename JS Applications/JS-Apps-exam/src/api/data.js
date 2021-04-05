import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllItems() {
	return await api.get(host + `/data/wiki?sortBy=_createdOn%20desc`);
}

export async function getItem(id) {
	return await api.get(host + '/data/wiki/' + id);
}

export async function getMyItems(id) {
	return await api.get(host + `/data/wiki?sortBy=_createdOn%20desc&distinct=category`);
}

export async function createItem(data) {
	return await api.post(host + '/data/wiki', data);
}

export async function editItem(id, data) {
	return await api.put(host + '/data/wiki/' + id, data);
}

export async function deleteItem(id) {
	return await api.del(host + '/data/wiki/' + id);
}

export async function search(query) {
	return await api.get(host + `/data/wiki?where=title%20LIKE%20%22${query}%22`);
}

export function itemSubmitValidation() {
	const form = document.querySelector('form fieldset');
	const inputs = Array.from(form.elements).filter((x) => !['submit', 'button', 'hidden'].includes(x.type));

	const inputValues = inputs.map((x) => {
		if (x.type == 'radio') {
			return x.value;
		}
		return x.value.trim();
	});

	if (inputValues.includes('')) {
		throw new Error('Empty fields!');
	}

	return inputs.reduce((acc, input) => ({ ...acc, [input.name]: input.type == 'radio' ? input.value : input.value.trim() }), {});
}
