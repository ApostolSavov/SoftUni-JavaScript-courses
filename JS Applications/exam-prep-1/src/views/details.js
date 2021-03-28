import { getItem, deleteItem } from '../api/data.js';
import { detailsTemplate, loadingTemplate } from './templates.js';

export async function detailsPage(ctx) {
	ctx.render(loadingTemplate());

	const data = await getItem(ctx.params.id);

	ctx.render(detailsTemplate(data, sessionStorage.getItem('userId'), deleteHandler));

	async function deleteHandler() {
		const confirmed = confirm('Are you sure you want to delete this item?');
		if (confirmed) {
			await deleteItem(ctx.params.id);
			ctx.page.redirect('/');
		}
		return;
	}
}
