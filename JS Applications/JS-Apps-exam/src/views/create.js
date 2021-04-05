import { createItem, itemSubmitValidation } from '../api/data.js';
import { createTemplate } from './templates.js';

export async function createPage(ctx) {
	ctx.render(createTemplate(createItemHandler));

	async function createItemHandler(e) {
		e.preventDefault();

		let data = null;

		try {
			data = itemSubmitValidation();
		} catch (err) {
			alert(err.message);
			return;
		}

		if (!['JavaScript', 'C#', 'Java', 'Python'].includes(data.category)) {
			return alert('Category must be on of these: JavaScript, C#, Java, or Python');
		}

		await createItem(data);

		ctx.page.redirect('/');
	}
}
