import { login } from '../api/data.js';
import { loginTemplate } from './templates.js';

export async function loginPage(ctx) {
	ctx.render(loginTemplate(loginHandler));

	async function loginHandler(e) {
		e.preventDefault();
		const form = document.querySelector('#login fieldset').elements;

		if (
			Array.from(form)
				.filter((x) => x.type != 'submit')
				.map((x) => x.value.trim())
				.includes('')
		) {
			alert('Empty fields!');
			return;
		}

		await login(form.email.value, form.password.value);

		ctx.page.redirect('/');
	}
}
