import { notification, register } from '../api/data.js';
import { registerTemplate } from './templates.js';

export async function registerPage(ctx) {
	ctx.render(registerTemplate(registerHandler));

	async function registerHandler(e) {
		e.preventDefault();
		const form = document.getElementById('register-form');

		if (
			[
				form.username.value.trim(),
				form.email.value.trim(),
				form.password.value.trim(),
				form.repeatPass.value.trim(),
				form.gender.value
			].includes('')
		) {
			notification('Empty fields!');
			return;
		} else if (form.password.value != form.repeatPass.value) {
			notification("Passwords don't match!");
			return;
		}

		await register(
			form.username.value.trim(),
			form.email.value.trim(),
			form.password.value.trim(),
			form.gender.value
		);

		ctx.page.redirect('/');
	}
}
