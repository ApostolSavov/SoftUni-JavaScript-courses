import { searchTemplate, loadingTemplate } from './templates.js';
import { search } from '../api/data.js';

export async function searchPage(ctx) {
	ctx.render(loadingTemplate());

	const searchKey = parseInt(ctx.querystring.split('=')[1]);

	const cars = Number.isNaN(searchKey) ? [] : await search(searchKey);

	ctx.render(searchTemplate(cars, searchHandler));

	async function searchHandler() {
		const query = document.getElementById('search-input').value.trim();

		ctx.page.redirect('/search?query=' + query);
	}
}
