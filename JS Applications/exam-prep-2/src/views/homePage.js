import { welcomeTemplate } from './templates.js';

export async function homePage(ctx) {
	if (sessionStorage.getItem('authToken')) {
		ctx.page.redirect('/catalog');
		return;
	}

	ctx.render(welcomeTemplate());
}
