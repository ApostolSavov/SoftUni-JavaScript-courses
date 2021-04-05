import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { navbarTemplate } from './views/templates.js';
import { homePage } from './views/homePage.js';
import { catalogPage } from './views/catalogPage.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { detailsPage } from './views/details.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { searchPage } from './views/searchPage.js';

import * as api from './api/data.js';

//check container names

const navbarContainer = document.getElementsByTagName('header')[0];
const contentContainer = document.getElementsByTagName('main')[0];

page('/', genericPageSetup, homePage);
page('/catalog', genericPageSetup, catalogPage);
page('/login', genericPageSetup, loginPage);
page('/register', genericPageSetup, registerPage);
page('/details/:id', genericPageSetup, detailsPage);
page('/create', genericPageSetup, createPage);
page('/edit/:id', genericPageSetup, editPage);
page('/search', genericPageSetup, searchPage);

page.start();

function genericPageSetup(ctx, next) {
	render(
		navbarTemplate(sessionStorage.getItem('authToken'), async () => {
			await api.logout();
			ctx.page.redirect('/');
		}),
		navbarContainer
	);
	ctx.render = (templResult) => render(templResult, contentContainer);
	next();
}
