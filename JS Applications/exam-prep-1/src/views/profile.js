import { profileTemplate, loadingTemplate } from './templates.js';
import { getMyItems } from '../api/data.js';

export async function profilePage(ctx) {
	ctx.render(loadingTemplate());

	const data = await getMyItems(sessionStorage.getItem('userId'));

	if (location.pathname != '/profile') {
		return;
	}

	ctx.render(
		profileTemplate(
			data,
			sessionStorage.getItem('username'),
			sessionStorage.getItem('email'),
			sessionStorage.getItem('gender')
		)
	);
}
