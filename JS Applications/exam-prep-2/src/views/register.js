import { register } from '../api/data.js';
import { registerTemplate } from './templates.js';

export async function registerPage(ctx) {
	ctx.render(registerTemplate(registerHandler));

	async function registerHandler(e) {
		e.preventDefault();
		const form = document.getElementById('register-form');

		if ([form.username.value.trim(), form.password.value.trim(), form.repeatPass.value.trim()].includes('')) {
			alert('Empty fields!');
			return;
		} else if (form.password.value != form.repeatPass.value) {
			alert("Passwords don't match!");
			return;
		}

		await register(form.username.value.trim(), form.password.value.trim());

		ctx.page.redirect('/');
	}
}
