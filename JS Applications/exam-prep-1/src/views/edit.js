import { getItem, editItem, itemSubmitValidation, notification } from '../api/data.js';
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

		e.target.setAttribute('disabled', 'true');

		let data = null;

		try {
			data = itemSubmitValidation();
		} catch (err) {
			e.target.removeAttribute('disabled');
			notification(err.message);
			return;
		}

		await editItem(ctx.params.id, data);

		ctx.page.redirect(`/details/${ctx.params.id}`);
	}
}
