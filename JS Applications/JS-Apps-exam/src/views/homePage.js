import { welcomeTemplate } from './templates.js';
import { getMyItems } from '../api/data.js';

const categories = {
	JavaScript: 'js',
	Python: 'python',
	Java: 'java',
	'C#': 'csharp'
};

export async function homePage(ctx) {
	const data = await getMyItems();

	ctx.render(welcomeTemplate(data, categories));
}
