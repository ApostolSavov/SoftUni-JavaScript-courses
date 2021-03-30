import { catalogTemplate, loadingTemplate } from './templates.js';
import { getAllItems, getCollectionSize } from '../api/data.js';

export async function catalogPage(ctx) {
	ctx.render(loadingTemplate());

	const count = await getCollectionSize();
	const pages = Math.ceil(count / 3);
	const page = Number(ctx.querystring.split('=')[1]) || 1;

	const data = await getAllItems(page);

	ctx.render(catalogTemplate(data, pages, page));
}
