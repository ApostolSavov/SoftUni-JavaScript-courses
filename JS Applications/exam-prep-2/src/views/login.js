import { login } from '../api/data.js';
import { loginTemplate } from './templates.js';

export async function loginPage(ctx) {
	ctx.render(loginTemplate(loginHandler));

	async function loginHandler(e) {
		e.preventDefault();
		const form = document.getElementById('login-form');

		if (
			Array.from(form.elements)
				.map((x) => x.value.trim())
				.includes('')
		) {
			alert('Empty fields!');
			return;
		}

		await login(form.username.value, form.password.value);

		ctx.page.redirect('/catalog');
	}
}
