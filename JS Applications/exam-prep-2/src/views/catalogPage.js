import { catalogTemplate, loadingTemplate } from './templates.js';
import { getAllItems } from '../api/data.js';

export async function catalogPage(ctx) {
	ctx.render(loadingTemplate());

	const data = await getAllItems();

	if (location.pathname != '/catalog') {
		return;
	}

	ctx.render(catalogTemplate(data));
}
