import { createItem, itemSubmitValidation, notification } from '../api/data.js';
import { createTemplate } from './templates.js';

export async function createPage(ctx) {
	ctx.render(createTemplate(createItemHandler));

	async function createItemHandler(e) {
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

		await createItem(data);

		ctx.page.redirect('/catalog');
	}
}
