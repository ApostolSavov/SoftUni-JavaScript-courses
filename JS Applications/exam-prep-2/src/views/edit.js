import { getItem, editItem, itemSubmitValidation } from '../api/data.js';
import { editTemplate, loadingTemplate } from './templates.js';

export async function editPage(ctx) {
	ctx.render(loadingTemplate());

	const data = await getItem(ctx.params.id);

	if (location.pathname != `/edit/${ctx.params.id}`) {
		return;
	}

	ctx.render(editTemplate(data, editItemHandler));

	async function editItemHandler(e) {
		e.preventDefault();

		let data = null;

		try {
			data = itemSubmitValidation();
		} catch (err) {
			alert(err.message);
			return;
		}

		data.year = parseInt(data.year);
		data.price = parseInt(data.price);

		await editItem(ctx.params.id, data);

		ctx.page.redirect(`/details/${ctx.params.id}`);
	}
}
