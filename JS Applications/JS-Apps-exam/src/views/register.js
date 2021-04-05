import { register } from '../api/data.js';
import { registerTemplate } from './templates.js';

export async function registerPage(ctx) {
	ctx.render(registerTemplate(registerHandler));

	async function registerHandler(e) {
		e.preventDefault();
		const form = document.querySelector('#register fieldset').elements;

		if ([form.email.value.trim(), form.password.value.trim(), form['rep-pass'].value.trim()].includes('')) {
			alert('Empty fields!');
			return;
		} else if (form.password.value != form['rep-pass'].value) {
			alert("Passwords don't match!");
			return;
		}

		await register(form.email.value.trim(), form.password.value.trim());

		ctx.page.redirect('/');
	}
}
