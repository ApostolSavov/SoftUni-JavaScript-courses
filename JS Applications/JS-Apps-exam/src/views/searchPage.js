import { searchTemplate, loadingTemplate } from './templates.js';
import { search } from '../api/data.js';

export async function searchPage(ctx) {
	ctx.render(loadingTemplate());

	const searchKey = ctx.querystring.split('=')[1];

	const data = searchKey ? await search(searchKey) : [];

	ctx.render(searchTemplate(data, searchHandler));

	async function searchHandler(e) {
		e.preventDefault();

		const query = document.querySelector('form input[name="search"]').value.trim();

		ctx.page.redirect('/search?query=' + query);
	}
}
