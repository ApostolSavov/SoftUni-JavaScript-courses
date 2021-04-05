import { html } from '../../node_modules/lit-html/lit-html.js';

//navbar
export const navbarTemplate = (token, logout) => {
	return html` <h1><a class="home" href="/">SoftWiki</a></h1>
		<nav class="nav-buttons">
			<a href="/catalog">Catalogue</a>
			<a href="/search">Search</a>

			${token
				? html`<div id="user">
						<a href="/create">Create</a>
						<a @click=${logout} href="javascript:void(0)">Logout</a>
				  </div>`
				: html`<div id="guest">
						<a href="/login">Login</a>
						<a href="/register">Register</a>
				  </div>`}
		</nav>`;
};

//welcome page
export const welcomeTemplate = (data, categoryMap) => {
	return html`
		<section id="home-page" class="content">
			<h1>Recent Articles</h1>
			<section class="recent js">
				<h2>JavaScript</h2>
				${data.filter((x) => categoryMap[x.category] == 'js').length > 0
					? data
							.filter((x) => categoryMap[x.category] == 'js')
							.map((entry) => {
								return html`
									<article>
										<h3>${entry.title}</h3>
										<p>${entry.content}</p>
										<a href="/details/${entry._id}" class="btn details-btn">Details</a>
									</article>
								`;
							})
					: html`<h3 class="no-articles">No articles yet</h3>`}
			</section>
			<section class="recent csharp">
				<h2>C#</h2>
				${data.filter((x) => categoryMap[x.category] == 'csharp').length > 0
					? data
							.filter((x) => categoryMap[x.category] == 'csharp')
							.map((entry) => {
								return html`
									<article>
										<h3>${entry.title}</h3>
										<p>${entry.content}</p>
										<a href="/details/${entry._id}" class="btn details-btn">Details</a>
									</article>
								`;
							})
					: html`<h3 class="no-articles">No articles yet</h3>`}
			</section>
			<section class="recent java">
				<h2>Java</h2>
				${data.filter((x) => categoryMap[x.category] == 'java').length > 0
					? data
							.filter((x) => categoryMap[x.category] == 'java')
							.map((entry) => {
								return html`
									<article>
										<h3>${entry.title}</h3>
										<p>${entry.content}</p>
										<a href="/details/${entry._id}" class="btn details-btn">Details</a>
									</article>
								`;
							})
					: html`<h3 class="no-articles">No articles yet</h3>`}
			</section>
			<section class="recent python">
				<h2>Python</h2>
				${data.filter((x) => categoryMap[x.category] == 'python').length > 0
					? data
							.filter((x) => categoryMap[x.category] == 'python')
							.map((entry) => {
								return html`
									<article>
										<h3>${entry.title}</h3>
										<p>${entry.content}</p>
										<a href="/details/${entry._id}" class="btn details-btn">Details</a>
									</article>
								`;
							})
					: html`<h3 class="no-articles">No articles yet</h3>`}
			</section>
		</section>
	`;
};

//catalog Page
export const catalogTemplate = (data) => {
	return html`
		<section id="catalog-page" class="content catalogue">
			<h1>All Articles</h1>
			${data.length > 0
				? data.map((entry) => {
						return html` <a class="article-preview" href="/details/${entry._id}">
							<article>
								<h3>Topic: <span>${entry.title}</span></h3>
								<p>Category: <span>${entry.category}</span></p>
							</article>
						</a>`;
				  })
				: html`<h3 class="no-articles">No articles yet</h3>`}
		</section>
	`;
};

//login page
export const loginTemplate = (loginHandler) => {
	return html`
		<section id="login-page" class="content auth">
			<h1>Login</h1>
			<form @submit=${loginHandler} id="login" action="#" method="">
				<fieldset>
					<blockquote>
						Knowledge is like money: to be of value it must circulate, and in circulating it can increase in quantity and, hopefully, in
						value
					</blockquote>
					<p class="field email">
						<label for="email">Email:</label>
						<input type="email" id="email" name="email" placeholder="maria@email.com" />
					</p>
					<p class="field password">
						<label for="login-pass">Password:</label>
						<input type="password" id="login-pass" name="password" />
					</p>
					<p class="field submit">
						<input class="btn submit" type="submit" value="Log in" />
					</p>
					<p class="field">
						<span>If you don't have profile click <a href="/register">here</a></span>
					</p>
				</fieldset>
			</form>
		</section>
	`;
};

//register page
export const registerTemplate = (registerHandler) => {
	return html`
		<section id="register-page" class="content auth">
			<h1>Register</h1>
			<form @submit=${registerHandler} id="register" action="#" method="">
				<fieldset>
					<blockquote>
						Knowledge is not simply another commodity. On the contrary. Knowledge is never used up. It increases by diffusion and grows by
						dispersion.
					</blockquote>
					<p class="field email">
						<label for="register-email">Email:</label>
						<input type="email" id="register-email" name="email" placeholder="maria@email.com" />
					</p>
					<p class="field password">
						<label for="register-pass">Password:</label>
						<input type="password" name="password" id="register-pass" />
					</p>
					<p class="field password">
						<label for="register-rep-pass">Repeat password:</label>
						<input type="password" name="rep-pass" id="register-rep-pass" />
					</p>
					<p class="field submit">
						<input class="btn submit" type="submit" value="Register" />
					</p>
					<p class="field">
						<span>If you already have profile click <a href="/login">here</a></span>
					</p>
				</fieldset>
			</form>
		</section>
	`;
};

//create page
export const createTemplate = (createHandler) => {
	return html`
		<section id="create-page" class="content">
			<h1>Create Article</h1>
			<form @submit=${createHandler} id="create" action="#" method="">
				<fieldset>
					<p class="field title">
						<label for="create-title">Title:</label>
						<input type="text" id="create-title" name="title" placeholder="Enter article title" />
					</p>
					<p class="field category">
						<label for="create-category">Category:</label>
						<input type="text" id="create-category" name="category" placeholder="Enter article category" />
					</p>
					<p class="field">
						<label for="create-content">Content:</label>
						<textarea name="content" id="create-content"></textarea>
					</p>
					<p class="field submit">
						<input class="btn submit" type="submit" value="Create" />
					</p>
				</fieldset>
			</form>
		</section>
	`;
};

//edit page
export const editTemplate = (data, editHandler) => {
	return html`
		<section id="edit-page" class="content">
			<h1>Edit Article</h1>
			<form @submit=${editHandler} id="edit" action="#" method="">
				<fieldset>
					<p class="field title">
						<label for="title">Title:</label>
						<input type="text" name="title" id="title" placeholder="Enter article title" .value=${data.title} />
					</p>
					<p class="field category">
						<label for="category">Category:</label>
						<input type="text" name="category" id="category" placeholder="Enter article category" .value=${data.category} />
					</p>
					<p class="field">
						<label for="content">Content:</label>
						<textarea name="content" id="content" .value=${data.content}></textarea>
					</p>
					<p class="field submit">
						<input class="btn submit" type="submit" value="Save Changes" />
					</p>
				</fieldset>
			</form>
		</section>
	`;
};

//details page
export const detailsTemplate = (data, userId, del) => {
	return html`
		<section id="details-page" class="content details">
			<h1>${data.title}</h1>
			<div class="details-content">
				<strong>Published in category ${data.category}</strong>
				<p>${data.content}</p>
				<div class="buttons">
					${userId == data._ownerId ? html`<a href="javascript:void(0)" @click=${del} class="btn delete">Delete</a>` : ''}
					${userId == data._ownerId ? html`<a href="/edit/${data._id}" class="btn edit">Edit</a>` : ''}
					<a href="/" class="btn edit">Back</a>
				</div>
			</div>
		</section>
	`;
};

//search page
export const searchTemplate = (data, searchHandler) => {
	return html`
		<section id="search-page" class="content">
			<h1>Search</h1>
			<form @submit=${searchHandler} id="search-form">
				<p class="field search">
					<input type="text" placeholder="Search by article title" name="search" />
				</p>
				<p class="field submit">
					<input class="btn submit" type="submit" value="Search" />
				</p>
			</form>
			<div class="search-container">
				${data.length > 0
					? data.map((entry) => {
							return html` <a class="article-preview" href="/details/${entry._id}">
								<article>
									<h3>Topic: <span>${entry.title}</span></h3>
									<p>Category: <span>${entry.category}</span></p>
								</article>
							</a>`;
					  })
					: html`<h3 class="no-articles">No matching articles</h3>`}
			</div>
		</section>
	`;
};

//loading
export const loadingTemplate = () => {
	return html`
		<div class="col-md-12">
			<h2>Loading...</h2>
		</div>
	`;
};
